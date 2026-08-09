import uuid
from datetime import datetime, timezone
from typing import Optional
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.schemas import VolunteerCreate, VolunteerRead, MessageResponse
from app.database import get_db
from app.models import VolunteerModel

router = APIRouter(prefix="/api/volunteers", tags=["Volunteers"])

_DEFAULT_COUNTRIES: list[str] = [
    "Казахстан", "Узбекистан", "Беларусь", "Украина", "Россия",
    "Кыргызстан", "США", "Азербайджан", "Китай", "Германия",
    "Монголия", "Чехия",
]


@router.get("/countries", response_model=list[str])
async def get_countries(db: AsyncSession = Depends(get_db)):
    """Returns unique countries where approved volunteers come from."""
    query = select(VolunteerModel.country).where(VolunteerModel.status == "approved").distinct()
    result = await db.execute(query)
    db_countries = result.scalars().all()
    if not db_countries:
        return _DEFAULT_COUNTRIES
    return list(db_countries)


@router.get("", response_model=list[VolunteerRead])
async def list_volunteers(status: Optional[str] = None, db: AsyncSession = Depends(get_db)):
    """Admin: list all volunteer applications, optionally filtered by status."""
    query = select(VolunteerModel)
    if status:
        query = query.where(VolunteerModel.status == status)
    result = await db.execute(query)
    vols = result.scalars().all()
    return [
        VolunteerRead(
            id=v.id,
            name=v.name,
            email=v.email,
            country=v.country,
            phone=v.phone,
            subject=v.subject,
            message=v.message,
            status=v.status,
            created_at=v.created_at,
        )
        for v in vols
    ]


@router.post("", response_model=MessageResponse, status_code=status.HTTP_201_CREATED)
async def create_volunteer(body: VolunteerCreate, db: AsyncSession = Depends(get_db)):
    """Public: submit a volunteer application."""
    new_vol = VolunteerModel(
        id=str(uuid.uuid4()),
        name=body.name,
        email=body.email,
        country=body.country,
        phone=body.phone,
        subject=body.subject,
        message=body.message,
        status="pending",
        created_at=datetime.now(timezone.utc).isoformat(),
    )
    db.add(new_vol)
    await db.commit()
    return MessageResponse(message="Заявка принята! Мы свяжемся с вами в ближайшее время.")
