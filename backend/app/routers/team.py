"""
GET /api/team   — team members
TODO(db): SELECT * FROM team_members
"""
from fastapi import APIRouter
from app.schemas import TeamMemberRead

router = APIRouter(prefix="/api/team", tags=["Team"])

_store: list[TeamMemberRead] = [
    TeamMemberRead(id="diana", name="Диана", role="Основательница Integrity Unite"),
    TeamMemberRead(id="polina", name="Полина", role="Соосновательница Integrity Unite"),
]


@router.get("", response_model=list[TeamMemberRead])
async def list_team():
    """
    Public: return team members.
    TODO(db): SELECT * FROM team_members
    """
    return _store
