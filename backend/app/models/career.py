
from datetime import datetime

from sqlalchemy import Boolean, DateTime, String, func,UniqueConstraint, Text, Enum,Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.orm import relationship
from app.database import Base
import enum


# Base = declarative_base()

class ResourceType(enum.Enum):
    CERTIFICATION = "certification"
    VIDEO = "video"
    ARTICLE = "article"
    COURSE = "course"

class ProgressStatus(enum.Enum):
    NOT_STARTED = "not_started"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"

class CareerTrack(Base):
    __tablename__ = "career_tracks"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False) 
    overview: Mapped[str] = mapped_column(Text, nullable=False)
    
    levels = relationship("TrackLevel", back_populates="track", cascade="all, delete-orphan")
    enrolled_users = relationship("UserTrack", back_populates="track")

class TrackLevel(Base):
    __tablename__ = "track_levels"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    track_id: Mapped[int] = mapped_column(ForeignKey("career_tracks.id"), nullable=False)
    level_number: Mapped[int] = mapped_column(Integer, nullable=False) 
    title: Mapped[str] = mapped_column(String, nullable=False) 
    
    __table_args__ = (UniqueConstraint('track_id', 'level_number', name='_track_level_uc'),)
    
    track = relationship("CareerTrack", back_populates="levels")
    resources = relationship("Resource", back_populates="level", cascade="all, delete-orphan")

class Resource(Base):
    __tablename__ = "resources"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    level_id: Mapped[int] = mapped_column(ForeignKey("track_levels.id"), nullable=False)
    resource_type: Mapped[ResourceType] = mapped_column(Enum(ResourceType), nullable=False)
    overview: Mapped[str] = mapped_column(Text, nullable=False)
    title: Mapped[str] = mapped_column(String, nullable=False)
    url: Mapped[str | None] = mapped_column(String, nullable=True)
    is_mandatory: Mapped[bool] = mapped_column(Boolean, default=True) 
    
    level = relationship("TrackLevel", back_populates="resources")
    user_progress = relationship("ResourceProgress", back_populates="resource")


class ResourceProgress(Base):
    __tablename__ = "resource_progress"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    resource_id: Mapped[int] = mapped_column(ForeignKey("resources.id"), nullable=False)
    status: Mapped[ProgressStatus] = mapped_column(Enum(ProgressStatus), default=ProgressStatus.NOT_STARTED, nullable=False)
    completed_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    
    __table_args__ = (UniqueConstraint('user_id', 'resource_id', name='_user_resource_uc'),)
    
    user = relationship("User", back_populates="resource_progress")
    resource = relationship("Resource", back_populates="user_progress")