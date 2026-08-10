import uuid
from datetime import datetime, timezone
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.schemas import PublicationCreate, PublicationRead, MessageResponse
from app.database import get_db
from app.models import PublicationModel
from app.auth import require_admin, decode_admin_token, bearer_scheme

router = APIRouter(prefix="/api/publications", tags=["Publications"])


@router.get("", response_model=list[PublicationRead])
async def list_publications(
    status: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(bearer_scheme),
):
    """
    Public: published articles by default (no status param).
    Admin only: status='all'/'draft'/'rejected' requires a valid admin token.
    """
    query = select(PublicationModel)
    if status == "all":
        decode_admin_token(credentials.credentials if credentials else None)
        query = query.order_by(PublicationModel.date.desc())
    elif status and status != "published":
        decode_admin_token(credentials.credentials if credentials else None)
        query = query.where(PublicationModel.status == status).order_by(PublicationModel.date.desc())
    else:
        query = query.where(PublicationModel.status == "published").order_by(PublicationModel.date.desc())

    result = await db.execute(query)
    pubs = result.scalars().all()
    return [
        PublicationRead(
            id=p.id,
            title=p.title,
            author=p.author,
            category=p.category,
            excerpt=p.excerpt,
            content=p.content,
            status=p.status,
            date=p.date,
        )
        for p in pubs
    ]


@router.post("", response_model=MessageResponse, status_code=status.HTTP_201_CREATED)
async def submit_publication(body: PublicationCreate, db: AsyncSession = Depends(get_db)):
    """Public: submit article for review."""
    new_pub = PublicationModel(
        id=str(uuid.uuid4()),
        title=body.title,
        author=body.author,
        category=body.category,
        excerpt=body.excerpt,
        content=body.content,
        status="draft",
        date=datetime.now(timezone.utc).date().isoformat(),
    )
    db.add(new_pub)
    await db.commit()
    return MessageResponse(message="Статья отправлена на модерацию. Спасибо!")


@router.patch("/{pub_id}", response_model=PublicationRead)
async def moderate_publication(
    pub_id: str,
    action: str,
    db: AsyncSession = Depends(get_db),
    _admin: str = Depends(require_admin),
):
    """Admin only: publish or reject an article draft."""
    if action not in ("publish", "reject"):
        raise HTTPException(status_code=400, detail="action must be 'publish' or 'reject'")

    result = await db.execute(select(PublicationModel).where(PublicationModel.id == pub_id))
    pub = result.scalar_one_or_none()
    if not pub:
        raise HTTPException(status_code=404, detail="Publication not found")

    pub.status = "published" if action == "publish" else "rejected"
    await db.commit()
    await db.refresh(pub)
    return PublicationRead(
        id=pub.id,
        title=pub.title,
        author=pub.author,
        category=pub.category,
        excerpt=pub.excerpt,
        content=pub.content,
        status=pub.status,
        date=pub.date,
    )
