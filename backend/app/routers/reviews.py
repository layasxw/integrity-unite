"""
GET   /api/reviews         — approved reviews (public)
POST  /api/reviews         — submit a review (goes to pending)
PATCH /api/reviews/{id}    — approve or reject (admin)
TODO(db): swap in-memory store with DB queries
"""
import uuid
from datetime import datetime, timezone
from fastapi import APIRouter, HTTPException, status
from app.schemas import ReviewCreate, ReviewRead, MessageResponse

router = APIRouter(prefix="/api/reviews", tags=["Reviews"])

# ── Seed data (mock until DB is connected) ─────────────────────────────────────
_store: list[ReviewRead] = [
    ReviewRead(
        id="rev-1", name="Айгерим С.", role="Родитель",
        text="Сын занимается уже второй поток подряд — очень довольны.",
        status="approved", date="2026-02-01",
    ),
    ReviewRead(
        id="rev-2", name="Тимур К.", role="Волонтёр",
        text="Провёл здесь первые уроки в жизни и получил сертификат.",
        status="approved", date="2025-12-15",
    ),
    ReviewRead(
        id="rev-3", name="Алина Ж.", role="Ученик",
        text="Мне нравится, что можно спросить что угодно.",
        status="approved", date="2025-10-22",
    ),
]


@router.get("", response_model=list[ReviewRead])
async def list_reviews():
    """
    Public: return only approved reviews.
    TODO(db): SELECT * FROM reviews WHERE status='approved' ORDER BY date DESC
    """
    return [r for r in _store if r.status == "approved"]


@router.post("", response_model=MessageResponse, status_code=status.HTTP_201_CREATED)
async def submit_review(body: ReviewCreate):
    """
    Public: submit a review; goes into 'pending' until an admin approves it.
    TODO(db): INSERT INTO reviews (...) VALUES (...) with status='pending'
    """
    new = ReviewRead(
        id=str(uuid.uuid4()),
        status="pending",
        date=datetime.now(timezone.utc).date().isoformat(),
        **body.model_dump(),
    )
    _store.append(new)
    return MessageResponse(message="Спасибо за отзыв! Он появится после модерации.")


@router.patch("/{review_id}", response_model=ReviewRead)
async def moderate_review(review_id: str, action: str):
    """
    Admin: approve or reject a review. action = 'approve' | 'reject'
    TODO(db): UPDATE reviews SET status=:action WHERE id=:id
    """
    review = next((r for r in _store if r.id == review_id), None)
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    if action not in ("approve", "reject"):
        raise HTTPException(status_code=400, detail="action must be 'approve' or 'reject'")
    review.status = "approved" if action == "approve" else "rejected"
    return review
