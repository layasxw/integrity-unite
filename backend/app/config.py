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

    ALLOWED_ORIGINS: str = "http://localhost:5175"

    # Database — optional until connected
    DATABASE_URL: str = ""

    @property
    def origins(self) -> List[str]:
        return [o.strip() for o in self.ALLOWED_ORIGINS.split(",") if o.strip()]


settings = Settings()
