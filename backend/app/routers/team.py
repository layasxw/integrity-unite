from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.schemas import TeamMemberRead
from app.database import get_db
from app.models import TeamMemberModel

router = APIRouter(prefix="/api/team", tags=["Team"])


@router.get("", response_model=list[TeamMemberRead])
async def list_team(db: AsyncSession = Depends(get_db)):
    """Public: return team members."""
    result = await db.execute(select(TeamMemberModel))
    members = result.scalars().all()
    priority = {"diana": 1, "polina": 2, "aya": 3}
    sorted_members = sorted(members, key=lambda m: (priority.get(m.id, 99), m.id))
    return [
        TeamMemberRead(
            id=m.id,
            name=m.name,
            role=m.role,
            photo=m.photo,
            bio=m.bio,
        )
        for m in sorted_members
    ]
