import os
from sqlalchemy.orm import Session
from datetime import datetime, timezone
import uuid
import logging
from typing import Optional

import httpx

from app.models.water_rights import WaterAllocation, WaterTrade, TradeStatus
from app.models.user import User

logger = logging.getLogger(__name__)

# DHU AllianceChain HTTP base URL.
# Set DHU_ALLIANCE_CHAIN_URL in .env (e.g. "http://dhu-local:8080") to point at the real DHU.
_DHU_URL = os.getenv("DHU_ALLIANCE_CHAIN_URL", "http://dhu-local:8080")
_DHU_TIMEOUT = float(os.getenv("DHU_ALLIANCE_CHAIN_TIMEOUT_S", "5.0"))


class WaterTradingService:
    @staticmethod
    def initiate_trade(
        db: Session,
        from_field_id: str,
        to_field_id: str,
        amount_m3: float,
        user: User,
    ) -> WaterTrade:
        """
        Initiates a water rights trade and broadcasts it to the DHU AllianceChain
        via HTTP for PBFT consensus.

        The trade is persisted locally as PENDING first, then the DHU HTTP server
        is called.  If the DHU is unreachable (e.g. offline edge node), the trade
        remains PENDING and will be retried when connectivity is restored.
        The DHU calls back to POST /api/v1/trade/callback on consensus commit.
        """
        # 1. Verify 'from' field has sufficient quota
        allocation = db.query(WaterAllocation).filter(
            WaterAllocation.field_id == from_field_id
        ).first()

        if not allocation or (allocation.quota_m3 - allocation.consumed_m3) < amount_m3:
            raise ValueError("Insufficient water quota for trade")

        # 2. Persist a local PENDING record — provides an immediate audit trail
        trade = WaterTrade(
            tx_id=f"tx_{uuid.uuid4().hex[:12]}",
            from_field_id=from_field_id,
            to_field_id=to_field_id,
            amount_m3=amount_m3,
            status=TradeStatus.PENDING,
        )
        db.add(trade)
        db.commit()
        db.refresh(trade)

        # 3. Broadcast to the DHU AllianceChain HTTP server for PBFT consensus
        payload = {
            "tx_id": trade.tx_id,
            "from_field_id": from_field_id,
            "to_field_id": to_field_id,
            "amount_m3": amount_m3,
        }
        try:
            resp = httpx.post(
                f"{_DHU_URL}/trade",
                json=payload,
                timeout=_DHU_TIMEOUT,
            )
            resp.raise_for_status()
            logger.info(
                "[AllianceChain] Trade %s accepted by DHU (%s). PBFT consensus in progress.",
                trade.tx_id, _DHU_URL,
            )
        except httpx.HTTPStatusError as e:
            logger.error(
                "[AllianceChain] DHU rejected trade %s: HTTP %s — %s",
                trade.tx_id, e.response.status_code, e.response.text,
            )
        except httpx.RequestError as e:
            # DHU unreachable (offline field node) — trade stays PENDING
            logger.warning(
                "[AllianceChain] DHU unreachable for trade %s: %s. "
                "Trade remains PENDING until connectivity restored.",
                trade.tx_id, e,
            )

        return trade

    @staticmethod
    def sync_ledger_status(db: Session, tx_id: str, status: TradeStatus, block_hash: str = "") -> WaterTrade | None:
        """
        Callback invoked by the DHU AllianceChain HTTP server (via POST /api/v1/trade/callback)
        once PBFT quorum has been reached and a block has been finalized.

        Updates the trade record and adjusts the water allocation quotas atomically.
        """
        trade = db.query(WaterTrade).filter(WaterTrade.tx_id == tx_id).first()
        if not trade:
            logger.warning("[AllianceChain] Callback for unknown tx_id: %s", tx_id)
            return None

        trade.status = status

        if status == TradeStatus.COMMITTED:
            trade.committed_at = datetime.now(timezone.utc)
            if block_hash:
                trade.block_hash = block_hash  # store for audit verification

            # Update water allocations atomically
            from_alloc = db.query(WaterAllocation).filter(
                WaterAllocation.field_id == trade.from_field_id
            ).first()
            to_alloc = db.query(WaterAllocation).filter(
                WaterAllocation.field_id == trade.to_field_id
            ).first()

            if from_alloc:
                from_alloc.quota_m3 -= trade.amount_m3
            if to_alloc:
                to_alloc.quota_m3 += trade.amount_m3

        db.commit()
        logger.info("[AllianceChain] Trade %s ledger synced → %s (block: %s)", tx_id, status.value, block_hash or "N/A")
        return trade

