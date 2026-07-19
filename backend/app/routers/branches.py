from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.schemas import BranchRead
from app.database import get_db
from app.models import BranchModel

router = APIRouter(prefix="/api/branches", tags=["Branches"])


@router.get("", response_model=list[BranchRead])
async def list_branches(db: AsyncSession = Depends(get_db)):
    """Public: list all branches."""
    result = await db.execute(select(BranchModel).order_by(BranchModel.city))
    branches = result.scalars().all()
    return [
        BranchRead(
            id=b.id,
            city=b.city,
            lead=b.lead,
            volunteers=b.volunteers,
        )
        for b in branches
    ]
