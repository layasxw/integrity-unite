from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    APP_ENV: str = "development"
    APP_NAME: str = "Integrity Unite API"
    APP_VERSION: str = "1.0.0"
    SECRET_KEY: str = "change-me"
    DEBUG: bool = True

    # Пароль задаётся через переменную окружения на хостинге (Render/Railway),
    # а не хардкодится в коде — репозиторий публичный, менять тут нельзя.
    ADMIN_USERNAME: str = "admin"
    ADMIN_PASSWORD: str = "changeme123"

    ALLOWED_ORIGINS: str = "http://localhost:5175"

    # Database — optional until connected
    DATABASE_URL: str = ""

    @property
    def origins(self) -> List[str]:
        if self.ALLOWED_ORIGINS.strip() == "*":
            return ["*"]
        return [o.strip() for o in self.ALLOWED_ORIGINS.split(",") if o.strip()]

    @property
    def async_database_url(self) -> str:
        url = self.DATABASE_URL.strip()
        if not url:
            return ""
        if url.startswith("postgres://"):
            url = url.replace("postgres://", "postgresql+asyncpg://", 1)
        elif url.startswith("postgresql://"):
            url = url.replace("postgresql://", "postgresql+asyncpg://", 1)
        return url


settings = Settings()

