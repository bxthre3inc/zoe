from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.api.dependencies import get_current_user, RequireRole
from app.models.user import User, UserRole
from app.schemas.users import UserCreate, UserUpdate, UserResponse

router = APIRouter()

@router.get("/", response_model=list[UserResponse], tags=["Admin"])
def list_users(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    admin: User = Depends(RequireRole([UserRole.ADMIN]))
):
    """List all users (Admin only)"""
    users = db.query(User).offset(skip).limit(limit).all()
    return users

@router.post("/", response_model=UserResponse, tags=["Admin"])
def create_user(
    user: UserCreate,
    db: Session = Depends(get_db),
    admin: User = Depends(RequireRole([UserRole.ADMIN]))
):
    """Create a new user (Admin only)"""
    db_user = User(
        email=user.email,
        api_key=user.api_key
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.put("/{user_id}", response_model=UserResponse, tags=["Admin"])
def update_user(
    user_id: str,
    user_update: UserUpdate,
    db: Session = Depends(get_db),
    admin: User = Depends(RequireRole([UserRole.ADMIN]))
):
    """Update user role/tier (Admin only)"""
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
        
    update_data = user_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_user, key, value)
        
    db.commit()
    db.refresh(db_user)
    return db_user
