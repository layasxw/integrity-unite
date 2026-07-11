"""
POST /api/admin/login   — get a JWT access token
All admin-protected routes will require Bearer token (added later).
TODO(db): validate credentials against admin_users table (hashed passwords)
"""
from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, HTTPException, status
import bcrypt
from jose import jwt
from app.config import settings
from app.schemas import AdminLoginRequest, TokenResponse

router = APIRouter(prefix="/api/admin", tags=["Admin"])

# ── Hardcoded admin (swap with DB check when ready) ───────────────────────────
# To generate a new hash:
#   python -c "import bcrypt; print(bcrypt.hashpw(b'your-password', bcrypt.gensalt()).decode())"
_ADMIN_USER = "admin"
_ADMIN_HASH: bytes = bcrypt.hashpw(b"changeme123", bcrypt.gensalt())   # ← CHANGE before deploy!

_ALGORITHM = "HS256"
_TOKEN_EXPIRE_MINUTES = 60 * 8   # 8 hours


def _create_token(subject: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=_TOKEN_EXPIRE_MINUTES)
    return jwt.encode(
        {"sub": subject, "exp": expire},
        settings.SECRET_KEY,
        algorithm=_ALGORITHM,
    )


@router.post("/login", response_model=TokenResponse)
async def admin_login(body: AdminLoginRequest):
    """
    Admin login — returns a JWT Bearer token.
    TODO(db): fetch hashed_password FROM admin_users WHERE username=:username
    """
    password_matches = bcrypt.checkpw(body.password.encode(), _ADMIN_HASH)
    if body.username != _ADMIN_USER or not password_matches:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Неверный логин или пароль",
        )
    token = _create_token(body.username)
    return TokenResponse(access_token=token)
