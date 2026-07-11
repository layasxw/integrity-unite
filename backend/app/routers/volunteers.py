"""
GET  /api/volunteers/countries  — unique countries for the world map
GET  /api/volunteers            — all volunteers (admin only later)
POST /api/volunteers            — submit a volunteer application
TODO(db): swap mock data with real DB queries
"""
import uuid
from datetime import datetime, timezone
from typing import Optional
from fastapi import APIRouter, HTTPException, status
from app.schemas import VolunteerCreate, VolunteerRead, MessageResponse

router = APIRouter(prefix="/api/volunteers", tags=["Volunteers"])

# ── In-memory store (replaced by DB later) ─────────────────────────────────────
_store: list[VolunteerRead] = []

_COUNTRIES: list[str] = [
    "Казахстан", "Узбекистан", "Беларусь", "Украина", "Россия",
    "Кыргызстан", "США", "Азербайджан", "Китай", "Германия",
    "Монголия", "Чехия",
]


@router.get("/countries", response_model=list[str])
async def get_countries():
    """
    Returns unique countries where volunteers come from.
    TODO(db): SELECT DISTINCT country FROM volunteers WHERE status='approved'
    """
    # Once DB is ready, derive from real volunteer records
    return _COUNTRIES


@router.get("", response_model=list[VolunteerRead])
async def list_volunteers(status: Optional[str] = None):
    """
    Admin: list all volunteer applications, optionally filtered by status.
    TODO(db): SELECT * FROM volunteers [WHERE status = :status]
    """
    if status:
        return [v for v in _store if v.status == status]
    return _store


@router.post("", response_model=MessageResponse, status_code=status.HTTP_201_CREATED)
async def create_volunteer(body: VolunteerCreate):
    """
    Public: submit a volunteer application.
    TODO(db): INSERT INTO volunteers (...) VALUES (...)
    """
    new = VolunteerRead(
        id=str(uuid.uuid4()),
        status="pending",
        created_at=datetime.now(timezone.utc).isoformat(),
        **body.model_dump(),
    )
    _store.append(new)
    return MessageResponse(message="Заявка принята! Мы свяжемся с вами в ближайшее время.")
