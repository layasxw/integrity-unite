// Мок-данные. Теперь используются как fallback для useApiData() —
// показываются сразу, пока грузится реальный ответ с бэкенда (backend/),
// и остаются рабочими, если бэкенд недоступен (см. src/hooks/useApiData.ts).

// Отдаётся бэкендом: GET /api/stats
export const stats = [
  { label: "Проект работает с", value: "30.01.2024" },
  { label: "Проведено потоков", value: "7" },
  { label: "Длительность потока", value: "3 месяца" },
  { label: "Проведено уроков", value: "11 500" },
  { label: "Волонтёров за всё время", value: "700+" },
  { label: "Координаторов", value: "94" },
  { label: "Менеджеров", value: "20" },
];

// Отдаётся бэкендом: GET /api/volunteers/countries
export const volunteerCountries = [
  "Казахстан",
  "Узбекистан",
  "Беларусь",
  "Украина",
  "Россия",
  "Кыргызстан",
  "США",
  "Азербайджан",
  "Китай",
  "Германия",
  "Монголия",
  "Чехия",
];

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  // Путь к фото в public/images/team/, например "/images/team/diana.jpg".
  // Если не указан — рендерится кружок с первой буквой имени.
  photo?: string;
}

// Отдаётся бэкендом: GET /api/team
// Чтобы добавить человека: положи фото в public/images/team/<id>.jpg,
// добавь объект { id, name, role, photo: "/images/team/<id>.jpg" } ниже
// (это fallback) и попроси бэкендера добавить то же самое в backend/app/routers/team.py.
export const team: TeamMember[] = [
  {
    id: "diana",
    name: "Диана",
    role: "Основательница Integrity Unite",
  },
  {
    id: "polina",
    name: "Полина",
    role: "Соосновательница Integrity Unite",
  },
];

export interface Club {
  id: string;
  name: string;
  description: string;
}

// TODO(backend): пока нет эндпоинта — клубы создают сами волонтёры
// («основать свой клуб» в ТЗ), нужны CRUD-эндпоинты, например
// GET/POST /api/clubs, плюс модерация. Остаётся статикой до тех пор.
export const clubs: Club[] = [
  {
    id: "debate",
    name: "Дебатный клуб",
    description: "Отработка аргументации, публичных выступлений и критического мышления на регулярных дебатных сессиях.",
  },
  {
    id: "ielts",
    name: "IELTS-клуб",
    description: "Подготовка к международному экзамену вместе с другими волонтёрами и менторами.",
  },
  {
    id: "research",
    name: "Research-клуб",
    description: "Совместная работа над исследовательскими проектами и статьями для публикации.",
  },
];

export interface Publication {
  id: string;
  title: string;
  author: string;
  category: string;
  excerpt: string;
  date: string;
  url?: string;
}

// Отдаётся бэкендом: GET /api/publications (только опубликованные).
// TODO: форма подачи новой статьи — POST /api/publications уже готов на
// бэкенде, не хватает только формы на фронте (см. Publications.tsx).
export const publications: Publication[] = [
  {
    id: "pub-1",
    title: "Как организовать волонтёрский проект в своей школе",
    author: "Полина Ханчина",
    category: "Практическое руководство",
    excerpt:
      "Пошаговый разбор запуска локальной инициативы: от идеи и команды до первых мероприятий и обратной связи.",
    date: "2026-03-12",
  },
  {
    id: "pub-2",
    title: "Опыт онлайн-обучения детей из малообеспеченных семей: сравнение подходов",
    author: "Диана",
    category: "Аналитический обзор",
    excerpt:
      "Сравнение форматов дистанционного образования в разных странах и то, что из этого можно применить в волонтёрских проектах.",
    date: "2026-01-20",
  },
  {
    id: "pub-3",
    title: "Что мне дало волонтёрство: год в Integrity Unite",
    author: "Волонтёр 5-го потока",
    category: "Эссе",
    excerpt: "Личные размышления о том, как преподавание другим меняет собственный взгляд на образование.",
    date: "2025-11-02",
  },
];

export interface Review {
  id: string;
  name: string;
  role: "Волонтёр" | "Родитель" | "Ученик" | "Партнёр";
  text: string;
  date: string;
}

// Отдаётся бэкендом: GET /api/reviews (только approved).
// TODO: форма отправки отзыва — POST /api/reviews на бэкенде уже готов
// (уходит в статус "pending" до модерации), не хватает формы на фронте.
export const reviews: Review[] = [
  {
    id: "rev-1",
    name: "Айгерим С.",
    role: "Родитель",
    text: "Сын занимается уже второй поток подряд — очень довольны отношением волонтёров и тем, что всё бесплатно.",
    date: "2026-02-01",
  },
  {
    id: "rev-2",
    name: "Тимур К.",
    role: "Волонтёр",
    text: "Провёл здесь первые уроки в жизни и получил сертификат, который потом пригодился при поступлении.",
    date: "2025-12-15",
  },
  {
    id: "rev-3",
    name: "Алина Ж.",
    role: "Ученик",
    text: "Мне нравится, что можно спросить что угодно и преподаватель объяснит ещё раз, не торопя.",
    date: "2025-10-22",
  },
];

export interface TopVolunteer {
  id: string;
  name: string;
  cohort: string;
  award: string;
  description: string;
}

// Отдаётся бэкендом: GET /api/top-volunteers
export const topVolunteers: TopVolunteer[] = [
  {
    id: "top-1",
    name: "Полина Ханчина",
    cohort: "Поток 1—7",
    award: "Best International Volunteer",
    description: "Соучредитель проекта, провела десятки уроков и менторских сессий по подготовке к IELTS.",
  },
  {
    id: "top-2",
    name: "Диана",
    cohort: "Поток 1—7",
    award: "Best National Volunteer",
    description: "Организатор проекта, отвечает за координацию потоков и работу с командой.",
  },
];

export interface Branch {
  id: string;
  city: string;
  lead: string;
  volunteers: number;
}

// Отдаётся бэкендом: GET /api/branches
export const branches: Branch[] = [
  { id: "br-1", city: "Алматы", lead: "в поиске главы филиала", volunteers: 0 },
  { id: "br-2", city: "Астана", lead: "в поиске главы филиала", volunteers: 0 },
];

export interface Cohort {
  id: string;
  name: string;
  period: string;
  is_active?: boolean;
}

// Отдаётся бэкендом: GET /api/cohorts
export const cohortSchedule: Cohort[] = [
  { id: "c1", name: "Поток 1", period: "янв 2024 — апр 2024" },
  { id: "c2", name: "Поток 2", period: "апр 2024 — июль 2024" },
  { id: "c3", name: "Поток 3", period: "июль 2024 — окт 2024" },
  { id: "c4", name: "Поток 4", period: "окт 2024 — янв 2025" },
  { id: "c5", name: "Поток 5", period: "янв 2025 — апр 2025" },
  { id: "c6", name: "Поток 6", period: "апр 2025 — июль 2025" },
  { id: "c7", name: "Поток 7", period: "июль 2025 — окт 2025" },
  { id: "c8", name: "Поток 8 (набор открыт)", period: "старт 10 июля", is_active: true },
];

export interface Partner {
  id: string;
  /** Название организации — используется как alt и как подпись при наведении. */
  name: string;
  /** Путь к логотипу в public/images/partners/. Лучше квадратная картинка. */
  logo: string;
  /** Если указан — логотип становится ссылкой на сайт партнёра. */
  url?: string;
}

// TODO(backend): партнёры меняются редко — пока статика. Если понадобится
// добавлять их из админки, завести GET /api/partners + CRUD и хранение логотипов.
//
// Чтобы добавить партнёра: положи квадратный логотип в public/images/partners/
// и добавь объект { id, name, logo, url } ниже.
export const partners: Partner[] = [
  { id: "nbfu", name: "NBFU", logo: "/images/partners/nbfu.jpg" },
  // TODO: уточнить название и ссылку этого партнёра (логотип — синяя «a»).
  { id: "partner-a", name: "Партнёр", logo: "/images/partners/partner-a.png" },
  { id: "myextra", name: "myextra", logo: "/images/partners/myextra.jpg" },
  { id: "jasa", name: "Jasa", logo: "/images/partners/jasa.jpg" },
];

// Настоящие рабочие ссылки на Google-формы и почту — не мок-данные,
// менять не нужно, пока команда не решит перейти на свои формы с бэкендом.
export const links = {
  volunteerForm: "https://forms.gle/VW68RK5AJg79XDch8",
  branchForm: "https://forms.gle/zZkAC7GrxwmJKgm79",
  publicationForm: "https://forms.gle/SeXdn1A4x6VeCRqk6",
  contactEmail: "hanchina.polina@gmail.com",
};
