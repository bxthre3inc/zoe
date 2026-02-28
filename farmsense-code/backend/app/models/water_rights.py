from sqlalchemy import Column, String, Float, DateTime, ForeignKey, Enum as sqlalchemy_enum
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid
import enum
from .sensor_data import Base

class TradeStatus(str, enum.Enum):
    PENDING = "pending"
    COMMITTED = "committed"
    FAILED = "failed"

class WaterAllocation(Base):
    """Tracks field-level water cubic-meter quotas"""
    __tablename__ = 'water_allocations'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    field_id = Column(String(50), nullable=False, unique=True, index=True)
    quota_m3 = Column(Float, default=0.0)
    consumed_m3 = Column(Float, default=0.0)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class WaterTrade(Base):
    """Immutable log of water rights transfers"""
    __tablename__ = 'water_trades'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    tx_id = Column(String(100), unique=True, index=True) # PBFT tx_id
    from_field_id = Column(String(50), nullable=False, index=True)
    to_field_id = Column(String(50), nullable=False, index=True)
    amount_m3 = Column(Float, nullable=False)
    status = Column(sqlalchemy_enum(TradeStatus), default=TradeStatus.PENDING)
    committed_at = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
