"""
GET /api/top-volunteers   — featured top volunteers
TODO(db): SELECT * FROM top_volunteers ORDER BY cohort
"""
from fastapi import APIRouter
from app.schemas import TopVolunteerRead

router = APIRouter(prefix="/api/top-volunteers", tags=["Top Volunteers"])

_store: list[TopVolunteerRead] = [
    TopVolunteerRead(
        id="top-1",
        name="Полина Ханчина",
        cohort="Поток 1—7",
        award="Best International Volunteer",
        description="Соучредитель проекта, провела десятки уроков и менторских сессий.",
    ),
    TopVolunteerRead(
        id="top-2",
        name="Диана",
        cohort="Поток 1—7",
        award="Best National Volunteer",
        description="Организатор проекта, отвечает за координацию потоков.",
    ),
]


@router.get("", response_model=list[TopVolunteerRead])
async def list_top_volunteers():
    """
    Public: return top volunteers list.
    TODO(db): SELECT * FROM top_volunteers ORDER BY id
    """
    return _store
