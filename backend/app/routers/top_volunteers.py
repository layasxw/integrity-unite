from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.schemas import TopVolunteerRead
from app.database import get_db
from app.models import TopVolunteerModel

router = APIRouter(prefix="/api/top-volunteers", tags=["Top Volunteers"])


@router.get("", response_model=list[TopVolunteerRead])
async def list_top_volunteers(db: AsyncSession = Depends(get_db)):
    """Public: return top volunteers list."""
    result = await db.execute(select(TopVolunteerModel).order_by(TopVolunteerModel.id))
    volunteers = result.scalars().all()
    return [
        TopVolunteerRead(
            id=v.id,
            name=v.name,
            cohort=v.cohort,
            award=v.award,
            description=v.description,
            photo_url=v.photo_url,
        )
        for v in volunteers
    ]
