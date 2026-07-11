export interface NavLink {
  label: string;
  to: string;
}

export interface NavGroup {
  label: string;
  links: NavLink[];
}

export const primaryLinks: NavLink[] = [
  { label: "Главная", to: "/" },
  { label: "О проекте", to: "/about" },
  { label: "Команда", to: "/team" },
  { label: "Отзывы", to: "/reviews" },
  { label: "Расписание", to: "/schedule" },
];

export const navGroups: NavGroup[] = [
  {
    label: "Волонтёрам",
    links: [
      { label: "Как стать волонтёром", to: "/volunteer" },
      { label: "Клубы", to: "/volunteer/clubs" },
      { label: "Филиалы", to: "/volunteer/branches" },
      { label: "Публикации", to: "/volunteer/publications" },
      { label: "Лучшие волонтёры", to: "/volunteer/top" },
    ],
  },
  {
    label: "Родителям",
    links: [
      { label: "Как записать ребёнка", to: "/parents/enroll" },
      { label: "Как проходят занятия", to: "/parents/how-it-works" },
      { label: "Безопасность и преподаватели", to: "/parents/safety" },
      { label: "FAQ", to: "/parents/faq" },
    ],
  },
  {
    label: "Ученикам",
    links: [
      { label: "Что можно изучать", to: "/students/subjects" },
      { label: "Как проходит урок", to: "/students/lesson" },
      { label: "Расписание уроков", to: "/students/schedule" },
    ],
  },
];
