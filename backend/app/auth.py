"""
Проверка admin-токена (JWT), выданного POST /api/admin/login.
Используется как FastAPI-зависимость в роутерах, которые должны быть
доступны только администратору.
"""
from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from app.config import settings

ALGORITHM = "HS256"

# auto_error=False — чтобы можно было вручную решать, требовать токен или нет
# (например, GET /api/reviews публичен без статуса, но приватен со status=all)
bearer_scheme = HTTPBearer(auto_error=False)


def decode_admin_token(token: Optional[str]) -> str:
    """Возвращает username из токена или бросает 401."""
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Требуется авторизация")
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Токен недействителен или истёк")
    username = payload.get("sub")
    if not username:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Токен недействителен")
    return username


async def require_admin(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(bearer_scheme),
) -> str:
    """Жёсткая зависимость: эндпоинт всегда только для админа."""
    return decode_admin_token(credentials.credentials if credentials else None)
