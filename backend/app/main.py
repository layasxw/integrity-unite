"""
Integrity Unite — FastAPI backend
Entry point: uvicorn app.main:app --reload
Docs:        http://localhost:8000/docs
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.schemas import HealthResponse

# Routers
from app.routers import (
    stats,
    volunteers,
    reviews,
    publications,
    branches,
    top_volunteers,
    cohorts,
    team,
    admin,
)

# ─── App factory ──────────────────────────────────────────────────────────────
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description=(
        "REST API для платформы Integrity Unite — волонтёрской организации "
        "бесплатного образования. "
        "Документация доступна по адресу /docs (Swagger UI) и /redoc (ReDoc)."
    ),
    docs_url="/docs",
    redoc_url="/redoc",
)

# ─── CORS ─────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Routers ──────────────────────────────────────────────────────────────────
app.include_router(stats.router)
app.include_router(volunteers.router)
app.include_router(reviews.router)
app.include_router(publications.router)
app.include_router(branches.router)
app.include_router(top_volunteers.router)
app.include_router(cohorts.router)
app.include_router(team.router)
app.include_router(admin.router)


# ─── Health check ─────────────────────────────────────────────────────────────
@app.get("/health", response_model=HealthResponse, tags=["System"])
async def health():
    """Quick health-check used by load-balancers / monitoring."""
    return HealthResponse(
        status="ok",
        version=settings.APP_VERSION,
        environment=settings.APP_ENV,
    )


@app.get("/", tags=["System"])
async def root():
    return {
        "service": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "docs": "/docs",
        "health": "/health",
    }
