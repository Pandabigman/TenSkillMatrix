
from datetime import datetime

from sqlalchemy import Boolean, DateTime, String, func
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Column, Integer, BigInteger, ForeignKey, Text, Float, Index,UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
import uuid
from sqlalchemy.orm import relationship



from app.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    is_admin: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )
    enrolled_tracks = relationship("UserTrack", back_populates="user", cascade="all, delete-orphan")
    resource_progress = relationship("ResourceProgress", back_populates="user", cascade="all, delete-orphan")


# --- Mapping & Progress Tables ---
class UserTrack(Base):
    __tablename__ = "user_tracks"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    track_id: Mapped[int] = mapped_column(ForeignKey("career_tracks.id"), nullable=False)
    current_level: Mapped[int] = mapped_column(Integer, default=1, nullable=False) 
    
    __table_args__ = (UniqueConstraint('user_id', 'track_id', name='_user_track_uc'),)
    
    user = relationship("User", back_populates="enrolled_tracks")
    track = relationship("CareerTrack", back_populates="enrolled_users")