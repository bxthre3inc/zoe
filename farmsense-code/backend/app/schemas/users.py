from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.models.user import UserRole, SubscriptionTier

class UserBase(BaseModel):
    email: str
    role: UserRole
    tier: SubscriptionTier
    is_active: bool = True
    name: Optional[str] = None
    organization: Optional[str] = None
    phone: Optional[str] = None
    notes: Optional[str] = None

class UserCreate(BaseModel):
    email: str
    api_key: str

class UserUpdate(BaseModel):
    role: Optional[UserRole] = None
    tier: Optional[SubscriptionTier] = None
    is_active: Optional[bool] = None
    name: Optional[str] = None
    organization: Optional[str] = None
    phone: Optional[str] = None
    notes: Optional[str] = None

class UserResponse(BaseModel):
    id: str
    api_key: str
    created_at: datetime
    last_login: Optional[datetime] = None
    
    class Config:
        from_attributes = True
