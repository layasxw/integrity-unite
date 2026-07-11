"""
GET   /api/publications        — published articles (public)
POST  /api/publications        — submit article draft
PATCH /api/publications/{id}   — approve / reject (admin)
TODO(db): swap in-memory store with DB queries
"""
import uuid
from datetime import datetime, timezone
from fastapi import APIRouter, HTTPException, status
from app.schemas import PublicationCreate, PublicationRead, MessageResponse

router = APIRouter(prefix="/api/publications", tags=["Publications"])

_store: list[PublicationRead] = [
    PublicationRead(
        id="pub-1",
        title="Как организовать волонтёрский проект в своей школе",
        author="Полина Ханчина",
        category="Практическое руководство",
        excerpt="Пошаговый разбор запуска локальной инициативы.",
        status="published",
        date="2026-03-12",
    ),
    PublicationRead(
        id="pub-2",
        title="Опыт онлайн-обучения детей из малообеспеченных семей",
        author="Диана",
        category="Аналитический обзор",
        excerpt="Сравнение форматов дистанционного образования.",
        status="published",
        date="2026-01-20",
    ),
]


@router.get("", response_model=list[PublicationRead])
async def list_publications():
    """
    Public: return published articles.
    TODO(db): SELECT * FROM publications WHERE status='published' ORDER BY date DESC
    """
    return [p for p in _store if p.status == "published"]


@router.post("", response_model=MessageResponse, status_code=status.HTTP_201_CREATED)
async def submit_publication(body: PublicationCreate):
    """
    Public: submit article for review.
    TODO(db): INSERT INTO publications (...) with status='draft'
    """
    new = PublicationRead(
        id=str(uuid.uuid4()),
        status="draft",
        date=datetime.now(timezone.utc).date().isoformat(),
        **body.model_dump(),
    )
    _store.append(new)
    return MessageResponse(message="Статья отправлена на модерацию. Спасибо!")


@router.patch("/{pub_id}", response_model=PublicationRead)
async def moderate_publication(pub_id: str, action: str):
    """
    Admin: publish or reject an article draft.
    TODO(db): UPDATE publications SET status=:status WHERE id=:id
    """
    pub = next((p for p in _store if p.id == pub_id), None)
    if not pub:
        raise HTTPException(status_code=404, detail="Publication not found")
    if action not in ("publish", "reject"):
        raise HTTPException(status_code=400, detail="action must be 'publish' or 'reject'")
    pub.status = "published" if action == "publish" else "rejected"
    return pub
