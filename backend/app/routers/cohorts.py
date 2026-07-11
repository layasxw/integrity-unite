"""
GET /api/cohorts   — all cohorts / intake schedule
TODO(db): SELECT * FROM cohorts ORDER BY start_date
"""
from fastapi import APIRouter
from app.schemas import CohortRead

router = APIRouter(prefix="/api/cohorts", tags=["Cohorts"])

_store: list[CohortRead] = [
    CohortRead(id="c1", name="Поток 1", period="янв 2024 — апр 2024"),
    CohortRead(id="c2", name="Поток 2", period="апр 2024 — июль 2024"),
    CohortRead(id="c3", name="Поток 3", period="июль 2024 — окт 2024"),
    CohortRead(id="c4", name="Поток 4", period="окт 2024 — янв 2025"),
    CohortRead(id="c5", name="Поток 5", period="янв 2025 — апр 2025"),
    CohortRead(id="c6", name="Поток 6", period="апр 2025 — июль 2025"),
    CohortRead(id="c7", name="Поток 7", period="июль 2025 — окт 2025"),
    CohortRead(id="c8", name="Поток 8 (набор открыт)", period="старт 10 июля", is_active=True),
]


@router.get("", response_model=list[CohortRead])
async def list_cohorts():
    """
    Public: return cohort schedule.
    TODO(db): SELECT * FROM cohorts ORDER BY start_date
    """
    return _store
