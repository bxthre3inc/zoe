from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from app.core.database import get_db
from app.api.auth import get_current_user
from app.models.user import User
from app.models.water_rights import WaterTrade, WaterAllocation
from app.services.trading_service import WaterTradingService
from pydantic import BaseModel

router = APIRouter()

class TradeInitiateRequest(BaseModel):
    from_field_id: str
    to_field_id: str
    amount_m3: float

@router.post("/initiate", tags=["Trading"])
def initiate_water_trade(
    req: TradeInitiateRequest,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    """Starts a water rights transfer between fields."""
    try:
        return WaterTradingService.initiate_trade(
            db, req.from_field_id, req.to_field_id, req.amount_m3, user
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/ledger", tags=["Trading"])
def get_trading_ledger(
    field_id: str = None,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    """Retrieves the history of water rights trades."""
    query = db.query(WaterTrade)
    if field_id:
        query = query.filter(
            (WaterTrade.from_field_id == field_id) | 
            (WaterTrade.to_field_id == field_id)
        )
    return query.order_by(WaterTrade.created_at.desc()).all()

@router.get("/allocations", tags=["Trading"])
def get_water_allocations(
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    """Returns current water quotas for all fields."""
    return db.query(WaterAllocation).all()
