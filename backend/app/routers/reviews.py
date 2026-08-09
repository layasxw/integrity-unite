import uuid
from datetime import datetime, timezone
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.schemas import ReviewCreate, ReviewRead, MessageResponse
from app.database import get_db
from app.models import ReviewModel
from app.auth import require_admin, decode_admin_token, bearer_scheme

router = APIRouter(prefix="/api/reviews", tags=["Reviews"])


@router.get("", response_model=list[ReviewRead])
async def list_reviews(
    status: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(bearer_scheme),
):
    """
    Public: return approved reviews by default (no status param).
    Admin only: status='all' or status='pending'/'rejected' requires a valid admin token.
    """
    query = select(ReviewModel)
    if status == "all":
        decode_admin_token(credentials.credentials if credentials else None)
        query = query.order_by(ReviewModel.date.desc())
    elif status and status != "approved":
        decode_admin_token(credentials.credentials if credentials else None)
        query = query.where(ReviewModel.status == status).order_by(ReviewModel.date.desc())
    else:
        query = query.where(ReviewModel.status == "approved").order_by(ReviewModel.date.desc())

    result = await db.execute(query)
    revs = result.scalars().all()
    return [
        ReviewRead(
            id=r.id,
            name=r.name,
            role=r.role,
            text=r.text,
            status=r.status,
            date=r.date,
        )
        for r in revs
    ]


@router.post("", response_model=MessageResponse, status_code=status.HTTP_201_CREATED)
async def submit_review(body: ReviewCreate, db: AsyncSession = Depends(get_db)):
    """Public: submit a review; goes into 'pending' until an admin approves it."""
    new_rev = ReviewModel(
        id=str(uuid.uuid4()),
        name=body.name,
        role=body.role,
        text=body.text,
        status="pending",
        date=datetime.now(timezone.utc).date().isoformat(),
    )
    db.add(new_rev)
    await db.commit()
    return MessageResponse(message="Спасибо за отзыв! Он появится после модерации.")


@router.patch("/{review_id}", response_model=ReviewRead)
async def moderate_review(
    review_id: str,
    action: str,
    db: AsyncSession = Depends(get_db),
    _admin: str = Depends(require_admin),
):
    """Admin only: approve or reject a review. action = 'approve' | 'reject'"""
    if action not in ("approve", "reject"):
        raise HTTPException(status_code=400, detail="action must be 'approve' or 'reject'")

    result = await db.execute(select(ReviewModel).where(ReviewModel.id == review_id))
    review = result.scalar_one_or_none()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")

    review.status = "approved" if action == "approve" else "rejected"
    await db.commit()
    await db.refresh(review)
    return ReviewRead(
        id=review.id,
        name=review.name,
        role=review.role,
        text=review.text,
        status=review.status,
        date=review.date,
    )
