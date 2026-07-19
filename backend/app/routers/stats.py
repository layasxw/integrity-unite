from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.schemas import StatItem
from app.database import get_db
from app.models import StatItemModel

router = APIRouter(prefix="/api/stats", tags=["Stats"])


@router.get("", response_model=list[StatItem])
async def get_stats(db: AsyncSession = Depends(get_db)):
    """Return project statistics shown on the homepage."""
    result = await db.execute(select(StatItemModel).order_by(StatItemModel.id))
    stats = result.scalars().all()
    return [StatItem(label=s.label, value=s.value) for s in stats]
