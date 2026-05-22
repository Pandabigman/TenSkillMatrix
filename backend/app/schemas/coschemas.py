from datetime import datetime
from enum import Enum

from pydantic import BaseModel, ConfigDict, EmailStr, Field


# --- Enums ---
class ResourceType(str, Enum):
    CERTIFICATION = "certification"
    VIDEO = "video"
    ARTICLE = "article"
    COURSE = "course"


class ProgressStatus(str, Enum):
    NOT_STARTED = "not_started"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"


# --- User & Auth Schemas (Your existing schemas) ---
# class UserBase(BaseModel):
#     email: EmailStr
#     full_name: str = Field(min_length=1, max_length=255)


# class UserCreate(UserBase):
#     password: str = Field(min_length=8, max_length=128)


# class UserUpdate(BaseModel):
#     full_name: str | None = Field(default=None, min_length=1, max_length=255)
#     password: str | None = Field(default=None, min_length=8, max_length=128)
#     is_admin: bool | None = None
#     is_active: bool | None = None


# class UserOut(UserBase):
#     model_config = ConfigDict(from_attributes=True)

#     id: int
#     is_admin: bool
#     is_active: bool
#     created_at: datetime
#     updated_at: datetime


# class UserLogin(BaseModel):
#     email: EmailStr
#     password: str


# class Token(BaseModel):
#     access_token: str
#     token_type: str = "bearer"
#     user: UserOut


# --- Resource Schemas ---
class ResourceBase(BaseModel):
    resource_type: ResourceType
    title: str = Field(min_length=1, max_length=255)
    overview: str
    url: str | None = None
    is_mandatory: bool = True


class ResourceCreate(ResourceBase):
    level_id: int


class ResourceUpdate(BaseModel):
    resource_type: ResourceType | None = None
    title: str | None = Field(default=None, min_length=1, max_length=255)
    overview: str | None = None
    url: str | None = None
    is_mandatory: bool | None = None


class ResourceOut(ResourceBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    level_id: int


# --- Track Level Schemas ---
class TrackLevelBase(BaseModel):
    level_number: int = Field(ge=1, le=5) # Enforces levels 1-5
    title: str = Field(min_length=1, max_length=100)


class TrackLevelCreate(TrackLevelBase):
    track_id: int


class TrackLevelUpdate(BaseModel):
    level_number: int | None = Field(default=None, ge=1, le=5)
    title: str | None = Field(default=None, min_length=1, max_length=100)


class TrackLevelOut(TrackLevelBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    track_id: int
    resources: list[ResourceOut] = []


# --- Career Track Schemas ---
class CareerTrackBase(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    overview: str


class CareerTrackCreate(CareerTrackBase):
    pass


class CareerTrackUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=100)
    overview: str | None = None


class CareerTrackOut(CareerTrackBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    levels: list[TrackLevelOut] = []


# --- Resource Progress Schemas ---
class ResourceProgressBase(BaseModel):
    status: ProgressStatus = ProgressStatus.NOT_STARTED
    completed_at: datetime | None = None


class ResourceProgressCreate(ResourceProgressBase):
    user_id: int
    resource_id: int


class ResourceProgressUpdate(BaseModel):
    status: ProgressStatus
    completed_at: datetime | None = None


class ResourceProgressOut(ResourceProgressBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    resource_id: int


# --- User Track Schemas ---
class UserTrackBase(BaseModel):
    current_level: int = Field(default=1, ge=1, le=5)


class UserTrackCreate(UserTrackBase):
    user_id: int
    track_id: int


class UserTrackUpdate(BaseModel):
    current_level: int = Field(ge=1, le=5)


class UserTrackOut(UserTrackBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    track_id: int


# --- Aggregate / Dashboard Schemas ---
class UserDashboardOut(BaseModel):
    """Aggregate schema for rendering a user's progress portal view"""
    model_config = ConfigDict(from_attributes=True)

    user: UserOut
    enrolled_tracks: list[UserTrackOut] = []
    resource_progress: list[ResourceProgressOut] = []