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
  bio?: string;
}

// Отдаётся бэкендом: GET /api/team. Это fallback — источник правды теперь
// backend/app/seed.py (там же роли/био/фото обновляются при редеплое).
export const team: TeamMember[] = [
  {
    id: "diana",
    name: "Диана",
    role: "Основательница Integrity Unite",
    photo: "/images/team/diana.jpg",
  },
  {
    id: "polina",
    name: "Полина",
    role: "Соосновательница Integrity Unite",
    photo: "/images/team/polina.png",
  },
  {
    id: "aya",
    name: "Аяулым",
    role: "Lead developer",
    photo: "/images/team/aya.png",
  },
  {
    id: "arina",
    name: "Арина",
    role: "Менеджер по данным и автоматизации",
    photo: "/images/team/arina.jpg",
    bio: "По большей части я работаю в сфере интернационального развития и EdTech. В свободное время изучаю языки и новые компетенции.",
  },
  {
    id: "dariya",
    name: "Дария",
    role: "Руководитель отдела дизайна",
    photo: "/images/team/dariya.jpg",
    bio: "Специализируюсь на проектировании цифровых продуктов на стыке UX/UI-дизайна, архитектуры информации и веб-технологий (HTML/CSS/JS).",
  },
  {
    id: "sofya",
    name: "Софья",
    role: "Дизайнер визуальных коммуникаций",
    photo: "/images/team/sofya.jpg",
    bio: "Специализируюсь на создании визуального контента: оформление презентаций, социальных сетей и цифровых материалов при помощи графических и дизайн-инструментов.",
  },
  {
    id: "dilaram",
    name: "Диларам",
    role: "Менеджер по коммуникации в чате",
    photo: "/images/team/dilaram.jpg",
    bio: "Работаю в сфере волонтёрства уже три года.",
  },
  {
    id: "zoryana",
    name: "Зоряна",
    role: "Копирайтер",
    photo: "/images/team/zoryana.jpg",
    bio: "Сфера интересов — синхронный перевод и международные отношения.",
  },
  {
    id: "marina",
    name: "Марина",
    role: "Главный секретарь проекта",
    photo: "/images/team/marina.jpg",
    bio: "Большая фанатка кинематографа и путешествий. Получила диплом по специальности «туризм и гостеприимство» и продолжает учиться и саморазвиваться non-stop.",
  },
  {
    id: "ayaulym-qc",
    name: "Аяулым",
    role: "Менеджер по контролю качества занятий",
    photo: "/images/team/ayaulym.jpg",
    bio: "Волонтёр с опытом работы в медицинских учреждениях и преподаватель английского языка с трехлетним опытом.",
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
  // Ссылка на полный текст (Google Doc с доступом «у кого есть ссылка»).
  // На бэкенде это же поле называется `content` (см. backend/app/schemas.py) —
  // имя совпадает специально, чтобы не трогать уже развёрнутую схему БД.
  content?: string;
}

// Отдаётся бэкендом: GET /api/publications (только опубликованные).
// Пустой массив специально: пока нет ни одной реально опубликованной работы,
// сайт не должен показывать выдуманные примеры как настоящие — только то,
// что реально прошло модерацию через форму на странице Publications.tsx.
export const publications: Publication[] = [];

export interface Review {
  id: string;
  name: string;
  role: "Волонтёр" | "Родитель" | "Ученик" | "Партнёр";
  text: string;
  date: string;
}

// Отдаётся бэкендом: GET /api/reviews (только approved). Пустой массив
// специально — сайт не должен показывать выдуманные отзывы как настоящие.
export const reviews: Review[] = [];

export interface TopVolunteer {
  id: string;
  name: string;
  cohort: string;
  award: string;
  description: string;
}

// Отдаётся бэкендом: GET /api/top-volunteers. Пустой массив, пока команда
// не выбрала реальных победителей — раньше тут были придуманные примеры.
// TODO(backend): чтобы реально кого-то добавить — пока только через прямую
// правку backend/app/seed.py (self-service админки для этого раздела ещё нет).
export const topVolunteers: TopVolunteer[] = [];

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
  { id: "c8", name: "Поток 8", period: "набор открыт", is_active: true },
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

export interface FounderContact {
  name: string;
  role: string;
  phone: string;
  phoneRaw: string;
  email: string;
}

export const foundersContacts: FounderContact[] = [
  {
    name: "Диана",
    role: "Основательница Integrity Unite",
    phone: "+7 705 874 52 26",
    phoneRaw: "+77058745226",
    email: "diannnaew@gmail.com",
  },
  {
    name: "Полина",
    role: "Соосновательница Integrity Unite",
    phone: "+375 33 631 15 14",
    phoneRaw: "+375336311514",
    email: "hanchina.polina@gmail.com",
  },
];

export const enrollmentContact = {
  partner: "Meyir-zhan foundation",
  representative: "Каламкас Канатовна",
  phone: "+7 708 416 44 69",
  phoneRaw: "+77084164469",
  whatsappUrl: "https://wa.me/77084164469",
};

