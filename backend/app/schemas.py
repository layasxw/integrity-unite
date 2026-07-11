from typing import Any, Dict, List, Optional
from pydantic import BaseModel, EmailStr


# ─── Generic ───────────────────────────────────────────────────────────────────

class MessageResponse(BaseModel):
    message: str


class HealthResponse(BaseModel):
    status: str
    version: str
    environment: str


# ─── Stats ─────────────────────────────────────────────────────────────────────

class StatItem(BaseModel):
    label: str
    value: str


# ─── Volunteer ─────────────────────────────────────────────────────────────────

class VolunteerCreate(BaseModel):
    name: str
    email: str
    country: str
    phone: Optional[str] = None
    subject: Optional[str] = None
    message: Optional[str] = None


class VolunteerRead(VolunteerCreate):
    id: str
    status: str   # pending | approved | rejected
    created_at: str


# ─── Student ───────────────────────────────────────────────────────────────────

class StudentCreate(BaseModel):
    student_name: str
    age: int
    parent_name: str
    parent_email: str
    phone: Optional[str] = None
    subject: str
    message: Optional[str] = None


class StudentRead(StudentCreate):
    id: str
    status: str
    created_at: str


# ─── Review ────────────────────────────────────────────────────────────────────

class ReviewCreate(BaseModel):
    name: str
    role: str   # Волонтёр | Родитель | Ученик | Партнёр
    text: str


class ReviewRead(ReviewCreate):
    id: str
    status: str   # pending | approved | rejected
    date: str


# ─── Publication ───────────────────────────────────────────────────────────────

class PublicationCreate(BaseModel):
    title: str
    author: str
    category: str
    excerpt: str
    content: Optional[str] = None


class PublicationRead(PublicationCreate):
    id: str
    status: str
    date: str


# ─── Branch ────────────────────────────────────────────────────────────────────

class BranchRead(BaseModel):
    id: str
    city: str
    lead: str
    volunteers: int


# ─── Top Volunteer ─────────────────────────────────────────────────────────────

class TopVolunteerRead(BaseModel):
    id: str
    name: str
    cohort: str
    award: str
    description: str
    photo_url: Optional[str] = None


# ─── Cohort / Schedule ─────────────────────────────────────────────────────────

class CohortRead(BaseModel):
    id: str
    name: str
    period: str
    is_active: bool = False


# ─── Team ──────────────────────────────────────────────────────────────────────

class TeamMemberRead(BaseModel):
    id: str
    name: str
    role: str
    photo: Optional[str] = None


# ─── Admin auth ────────────────────────────────────────────────────────────────

class AdminLoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
