from sqlalchemy.orm import Session
from datetime import datetime
import uuid
import logging
from typing import List, Optional

from app.models.water_rights import WaterAllocation, WaterTrade, TradeStatus
from app.models.user import User

logger = logging.getLogger(__name__)

class WaterTradingService:
    @staticmethod
    def initiate_trade(
        db: Session,
        from_field_id: str,
        to_field_id: str,
        amount_m3: float,
        user: User
    ) -> WaterTrade:
        """
        Initiates a water rights trade and broadcasts it to the DHU mesh for consensus.
        """
        # 1. Verify 'From' field has enough quota
        allocation = db.query(WaterAllocation).filter(
            WaterAllocation.field_id == from_field_id
        ).first()
        
        if not allocation or (allocation.quota_m3 - allocation.consumed_m3) < amount_m3:
            raise ValueError("Insufficient water quota for trade")

        # 2. Create local pending trade record
        trade = WaterTrade(
            tx_id=f"tx_{uuid.uuid4().hex[:12]}",
            from_field_id=from_field_id,
            to_field_id=to_field_id,
            amount_m3=amount_m3,
            status=TradeStatus.PENDING
        )
        db.add(trade)
        db.commit()
        db.refresh(trade)

        # 3. Broadcast to DHU Mesh (Mock)
        # In production, this calls the Go AllianceChain via gRPC or internal mesh protocol
        logger.info(f"[AllianceChain] Broadcasting trade {trade.tx_id} to DHU mesh for PBFT consensus...")
        
        return trade

    @staticmethod
    def sync_ledger_status(db: Session, tx_id: str, status: TradeStatus):
        """
        Callback used by the DHU AllianceChain to update the backend once consensus is reached.
        """
        trade = db.query(WaterTrade).filter(WaterTrade.tx_id == tx_id).first()
        if not trade:
            return

        trade.status = status
        if status == TradeStatus.COMMITTED:
            trade.committed_at = datetime.utcnow()
            
            # Update allocations
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
        logger.info(f"[AllianceChain] Trade {tx_id} synchronized: {status.value}")
