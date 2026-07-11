"""
GET /api/branches   — all active branches
TODO(db): SELECT * FROM branches
"""
from fastapi import APIRouter
from app.schemas import BranchRead

router = APIRouter(prefix="/api/branches", tags=["Branches"])

_store: list[BranchRead] = [
    BranchRead(id="br-1", city="Алматы", lead="в поиске главы филиала", volunteers=0),
    BranchRead(id="br-2", city="Астана", lead="в поиске главы филиала", volunteers=0),
]


@router.get("", response_model=list[BranchRead])
async def list_branches():
    """
    Public: list all branches.
    TODO(db): SELECT * FROM branches ORDER BY city
    """
    return _store
