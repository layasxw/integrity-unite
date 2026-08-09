from typing import AsyncGenerator
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession, AsyncConnection, create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from app.config import settings

db_url = settings.async_database_url or "postgresql+asyncpg://integrity:changeme@localhost:5432/integrity_unite"

engine = create_async_engine(
    db_url,
    echo=False,
    future=True,
)

async_session = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


class Base(DeclarativeBase):
    pass


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with async_session() as session:
        yield session


# Простые аддитивные правки схемы для уже развёрнутой базы — Base.metadata.create_all
# создаёт только отсутствующие ТАБЛИЦЫ, но не добавляет новые колонки в существующие.
# Полноценных миграций (Alembic) в проекте пока нет, поэтому новые nullable-колонки
# накатываем так. Каждая строка — идемпотентна, безопасно гонять при каждом старте.
_SCHEMA_PATCHES = [
    "ALTER TABLE team_members ADD COLUMN IF NOT EXISTS bio TEXT",
]


async def apply_schema_patches(conn: AsyncConnection) -> None:
    for statement in _SCHEMA_PATCHES:
        await conn.execute(text(statement))
