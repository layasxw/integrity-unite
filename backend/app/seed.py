import bcrypt
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.config import settings
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
    # 1. Admin user — логин/пароль берутся из ADMIN_USERNAME/ADMIN_PASSWORD
    # (переменные окружения на хостинге). Если пароль в настройках поменяли —
    # хэш в базе обновится при следующем старте приложения, ручного доступа
    # к БД не требуется.
    res = await db.execute(select(AdminModel).where(AdminModel.username == settings.ADMIN_USERNAME))
    admin = res.scalar_one_or_none()
    if not admin:
        hashed = bcrypt.hashpw(settings.ADMIN_PASSWORD.encode(), bcrypt.gensalt()).decode()
        db.add(AdminModel(username=settings.ADMIN_USERNAME, hashed_password=hashed))
    elif not bcrypt.checkpw(settings.ADMIN_PASSWORD.encode(), admin.hashed_password.encode()):
        admin.hashed_password = bcrypt.hashpw(settings.ADMIN_PASSWORD.encode(), admin.hashed_password.encode())

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

    # 3. Reviews — намеренно без сид-данных. Отзывы — контент от реальных
    # людей через форму на сайте, показывать выдуманные примеры как настоящие
    # нельзя. Таблица просто остаётся пустой, пока не появятся первые реальные.

    # 4. Publications — то же самое: только реальные заявки через форму,
    # никаких примеров-заглушек.

    # 5. Branches
    res = await db.execute(select(BranchModel))
    if not res.scalars().first():
        branches = [
            BranchModel(id="br-1", city="Алматы", lead="в поиске главы филиала", volunteers=0),
            BranchModel(id="br-2", city="Астана", lead="в поиске главы филиала", volunteers=0),
        ]
        db.add_all(branches)

    # 6. Top Volunteers — намеренно без сид-данных, пока команда не выберет
    # реальных победителей по итогам потока. Раньше тут были придуманные
    # примеры с выдуманными описаниями — убраны.

    # 7. Cohorts
    # TODO: чтобы поправить/добавить поток — отредактируй объект ниже и задеплой.
    # Вставляется и обновляется по id, как и команда — старые записи можно смело менять.
    cohorts = [
        CohortModel(id="c1", name="Поток 1", period="янв 2024 — апр 2024", is_active=False),
        CohortModel(id="c2", name="Поток 2", period="апр 2024 — июль 2024", is_active=False),
        CohortModel(id="c3", name="Поток 3", period="июль 2024 — окт 2024", is_active=False),
        CohortModel(id="c4", name="Поток 4", period="окт 2024 — янв 2025", is_active=False),
        CohortModel(id="c5", name="Поток 5", period="янв 2025 — апр 2025", is_active=False),
        CohortModel(id="c6", name="Поток 6", period="апр 2025 — июль 2025", is_active=False),
        CohortModel(id="c7", name="Поток 7", period="июль 2025 — окт 2025", is_active=False),
        CohortModel(id="c8", name="Поток 8", period="набор открыт", is_active=True),
    ]
    for cohort in cohorts:
        result = await db.execute(select(CohortModel).where(CohortModel.id == cohort.id))
        existing = result.scalar_one_or_none()
        if not existing:
            db.add(cohort)
        else:
            existing.name = cohort.name
            existing.period = cohort.period
            existing.is_active = cohort.is_active

    # 8. Team Members
    # TODO: чтобы добавить/поправить человека — допиши или отредактируй объект
    # ниже и задеплой. Работает и как вставка новых, и как обновление уже
    # существующих (по id) — старых участников можно смело редактировать.
    team = [
        TeamMemberModel(
            id="diana",
            name="Диана",
            role="Основательница Integrity Unite",
            photo="/images/team/diana.jpg",
        ),
        # Полина пока без фото — загруженный файл был в формате .DNG (RAW),
        # браузеры такое не показывают, нужен обычный .jpg/.png.
        TeamMemberModel(id="polina", name="Полина", role="Соосновательница Integrity Unite"),
        TeamMemberModel(
            id="arina",
            name="Арина",
            role="Менеджер по данным и автоматизации",
            photo="/images/team/arina.jpg",
            bio="По большей части я работаю в сфере интернационального развития и EdTech. В свободное время изучаю языки и новые компетенции.",
        ),
        TeamMemberModel(
            id="dariya",
            name="Дария",
            role="Руководитель отдела дизайна",
            photo="/images/team/dariya.jpg",
            bio="Специализируюсь на проектировании цифровых продуктов на стыке UX/UI-дизайна, архитектуры информации и веб-технологий (HTML/CSS/JS).",
        ),
        TeamMemberModel(
            id="sofya",
            name="Софья",
            role="Дизайнер визуальных коммуникаций",
            photo="/images/team/sofya.jpg",
            bio="Специализируюсь на создании визуального контента: оформление презентаций, социальных сетей и цифровых материалов при помощи графических и дизайн-инструментов.",
        ),
        TeamMemberModel(
            id="dilaram",
            name="Диларам",
            role="Менеджер по коммуникации в чате",
            photo="/images/team/dilaram.jpg",
            bio="Работаю в сфере волонтёрства уже три года.",
        ),
        TeamMemberModel(
            id="zoryana",
            name="Зоряна",
            role="Копирайтер",
            photo="/images/team/zoryana.jpg",
            bio="Сфера интересов — синхронный перевод и международные отношения.",
        ),
        TeamMemberModel(
            id="marina",
            name="Марина",
            role="Главный секретарь проекта",
            photo="/images/team/marina.jpg",
            bio="Большая фанатка кинематографа и путешествий. Получила диплом по специальности «туризм и гостеприимство» и продолжает учиться и саморазвиваться non-stop.",
        ),
        TeamMemberModel(
            id="ayaulym-qc",
            name="Аяулым",
            role="Менеджер по контролю качества занятий",
            photo="/images/team/ayaulym.jpg",
        ),
        # TODO: вторая Аяулым (должность не указана), Анна, Карина, Бинара —
        # ждём уточнения должностей/фото.
    ]
    for member in team:
        result = await db.execute(select(TeamMemberModel).where(TeamMemberModel.id == member.id))
        existing = result.scalar_one_or_none()
        if not existing:
            db.add(member)
        else:
            existing.name = member.name
            existing.role = member.role
            existing.photo = member.photo
            existing.bio = member.bio

    await db.commit()
