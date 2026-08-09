from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, HTTPException, status
import bcrypt
from jose import jwt
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.config import settings
from app.schemas import AdminLoginRequest, TokenResponse
from app.database import get_db
from app.models import AdminModel
from app.auth import ALGORITHM

router = APIRouter(prefix="/api/admin", tags=["Admin"])

_TOKEN_EXPIRE_MINUTES = 60 * 8   # 8 hours


def _create_token(subject: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=_TOKEN_EXPIRE_MINUTES)
    return jwt.encode(
        {"sub": subject, "exp": expire},
        settings.SECRET_KEY,
        algorithm=ALGORITHM,
    )


@router.post("/login", response_model=TokenResponse)
async def admin_login(body: AdminLoginRequest, db: AsyncSession = Depends(get_db)):
    """Admin login — validates against admin_users table and returns JWT token."""
    result = await db.execute(select(AdminModel).where(AdminModel.username == body.username))
    admin_user = result.scalar_one_or_none()

    if not admin_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Неверный логин или пароль",
        )

    password_matches = bcrypt.checkpw(body.password.encode(), admin_user.hashed_password.encode())
    if not password_matches:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Неверный логин или пароль",
        )

    token = _create_token(admin_user.username)
    return TokenResponse(access_token=token)
