"""
GET /api/stats
Returns homepage statistics.
TODO(db): replace mock list with DB query — SELECT key, value FROM stats
"""
from fastapi import APIRouter
from app.schemas import StatItem

router = APIRouter(prefix="/api/stats", tags=["Stats"])

# ── Mock data (swap with DB query when ready) ──────────────────────────────────
_STATS: list[StatItem] = [
    StatItem(label="Проект работает с", value="30.01.2024"),
    StatItem(label="Проведено потоков", value="7"),
    StatItem(label="Длительность потока", value="3 месяца"),
    StatItem(label="Проведено уроков", value="11 500"),
    StatItem(label="Волонтёров за всё время", value="700+"),
    StatItem(label="Координаторов", value="94"),
    StatItem(label="Менеджеров", value="20"),
]


@router.get("", response_model=list[StatItem])
async def get_stats():
    """Return project statistics shown on the homepage."""
    # TODO(db): return await db.fetch_all("SELECT label, value FROM stats")
    return _STATS
