from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.schemas import CohortRead
from app.database import get_db
from app.models import CohortModel

router = APIRouter(prefix="/api/cohorts", tags=["Cohorts"])


@router.get("", response_model=list[CohortRead])
async def list_cohorts(db: AsyncSession = Depends(get_db)):
    """Public: return cohort schedule."""
    result = await db.execute(select(CohortModel).order_by(CohortModel.id))
    cohorts = result.scalars().all()
    return [
        CohortRead(
            id=c.id,
            name=c.name,
            period=c.period,
            is_active=c.is_active,
        )
        for c in cohorts
    ]
