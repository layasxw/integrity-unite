import bcrypt
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models import (
    AdminModel,
    StatItemModel,
    ReviewModel,
    PublicationModel,
    BranchModel,
    TopVolunteerModel,
    CohortModel,
    TeamMemberModel,
)


async def seed_database(db: AsyncSession) -> None:
    # 1. Admin user
    res = await db.execute(select(AdminModel).where(AdminModel.username == "admin"))
    if not res.scalar_one_or_none():
        hashed = bcrypt.hashpw(b"changeme123", bcrypt.gensalt()).decode()
        db.add(AdminModel(username="admin", hashed_password=hashed))

    # 2. Stats
    res = await db.execute(select(StatItemModel))
    if not res.scalars().first():
        stats = [
            StatItemModel(label="Проект работает с", value="30.01.2024"),
            StatItemModel(label="Проведено потоков", value="7"),
            StatItemModel(label="Длительность потока", value="3 месяца"),
            StatItemModel(label="Проведено уроков", value="11 500"),
            StatItemModel(label="Волонтёров за всё время", value="700+"),
            StatItemModel(label="Координаторов", value="94"),
            StatItemModel(label="Менеджеров", value="20"),
        ]
        db.add_all(stats)

    # 3. Reviews
    res = await db.execute(select(ReviewModel))
    if not res.scalars().first():
        reviews = [
            ReviewModel(
                id="rev-1",
                name="Айгерим С.",
                role="Родитель",
                text="Сын занимается уже второй поток подряд — очень довольны отношением волонтёров и тем, что всё бесплатно.",
                status="approved",
                date="2026-02-01",
            ),
            ReviewModel(
                id="rev-2",
                name="Тимур К.",
                role="Волонтёр",
                text="Провёл здесь первые уроки в жизни и получил сертификат, который потом пригодился при поступлении.",
                status="approved",
                date="2025-12-15",
            ),
            ReviewModel(
                id="rev-3",
                name="Алина Ж.",
                role="Ученик",
                text="Мне нравится, что можно спросить что угодно и преподаватель объяснит ещё раз, не торопя.",
                status="approved",
                date="2025-10-22",
            ),
        ]
        db.add_all(reviews)

    # 4. Publications
    res = await db.execute(select(PublicationModel))
    if not res.scalars().first():
        publications = [
            PublicationModel(
                id="pub-1",
                title="Как организовать волонтёрский проект в своей школе",
                author="Полина Ханчина",
                category="Практическое руководство",
                excerpt="Пошаговый разбор запуска локальной инициативы: от идеи и команды до первых мероприятий.",
                status="published",
                date="2026-03-12",
            ),
            PublicationModel(
                id="pub-2",
                title="Опыт онлайн-обучения детей из малообеспеченных семей",
                author="Диана",
                category="Аналитический обзор",
                excerpt="Сравнение форматов дистанционного образования в разных странах.",
                status="published",
                date="2026-01-20",
            ),
        ]
        db.add_all(publications)

    # 5. Branches
    res = await db.execute(select(BranchModel))
    if not res.scalars().first():
        branches = [
            BranchModel(id="br-1", city="Алматы", lead="в поиске главы филиала", volunteers=0),
            BranchModel(id="br-2", city="Астана", lead="в поиске главы филиала", volunteers=0),
        ]
        db.add_all(branches)

    # 6. Top Volunteers
    res = await db.execute(select(TopVolunteerModel))
    if not res.scalars().first():
        top = [
            TopVolunteerModel(
                id="top-1",
                name="Полина Ханчина",
                cohort="Поток 1—7",
                award="Best International Volunteer",
                description="Соучредитель проекта, провела десятки уроков и менторских сессий.",
            ),
            TopVolunteerModel(
                id="top-2",
                name="Диана",
                cohort="Поток 1—7",
                award="Best National Volunteer",
                description="Организатор проекта, отвечает за координацию потоков.",
            ),
        ]
        db.add_all(top)

    # 7. Cohorts
    res = await db.execute(select(CohortModel))
    if not res.scalars().first():
        cohorts = [
            CohortModel(id="c1", name="Поток 1", period="янв 2024 — апр 2024", is_active=False),
            CohortModel(id="c2", name="Поток 2", period="апр 2024 — июль 2024", is_active=False),
            CohortModel(id="c3", name="Поток 3", period="июль 2024 — окт 2024", is_active=False),
            CohortModel(id="c4", name="Поток 4", period="окт 2024 — янв 2025", is_active=False),
            CohortModel(id="c5", name="Поток 5", period="янв 2025 — апр 2025", is_active=False),
            CohortModel(id="c6", name="Поток 6", period="апр 2025 — июль 2025", is_active=False),
            CohortModel(id="c7", name="Поток 7", period="июль 2025 — окт 2025", is_active=False),
            CohortModel(id="c8", name="Поток 8 (набор открыт)", period="старт 10 июля", is_active=True),
        ]
        db.add_all(cohorts)

    # 8. Team Members
    res = await db.execute(select(TeamMemberModel))
    if not res.scalars().first():
        team = [
            TeamMemberModel(id="diana", name="Диана", role="Основательница Integrity Unite"),
            TeamMemberModel(id="polina", name="Полина", role="Соосновательница Integrity Unite"),
        ]
        db.add_all(team)

    await db.commit()
