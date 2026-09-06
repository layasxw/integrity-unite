import PageHeader from "../../components/PageHeader";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";
import { enrollmentContact } from "../../data/mock";

const schoolSubjects = [
  "Математика",
  "Русский язык",
  "Английский язык",
  "Литература",
  "Физика",
  "Химия",
  "Биология",
  "История",
  "И другие предметы",
];

const categories = [
  {
    tag: "Базовая программа",
    title: "Школьные предметы",
    description:
      "Помощь с домашними заданиями, устранение пробелов в школьной программе, подготовка к контрольным работам и экзаменам с персональным волонтёром-наставником.",
    items: schoolSubjects,
    highlight: false,
  },
  {
    tag: "Интенсив",
    title: "Языковые курсы & IELTS",
    description:
      "Глубокая языковая подготовка к международному экзамену IELTS. Менторство от кофаундера проекта Полины (её личный результат — IELTS 8.0). Разбор стратегий всех секций: Listening, Reading, Writing и Speaking.",
    items: ["Подготовка к IELTS (8.0 mentor)", "Разговорная практика", "Грамматика и словарный запас", "Академическое письмо"],
    highlight: true,
  },
  {
    tag: "Творчество и наука",
    title: "Дополнительные направления",
    description:
      "Развитие талантов за рамками стандартных уроков. Участие в практических проектах, развитие кругозора и навыков самовыражения.",
    items: ["Творческие клубы", "Исследовательские работы", "Написание эссе", "Поэзия и литература"],
    highlight: false,
  },
  {
    tag: "Развитие лидерства",
    title: "Лидерские инициативы",
    description:
      "Возможность проявить себя не только как ученик, но и как лидер: основывание собственного тематического клуба, организация мероприятий при поддержке кураторов проекта.",
    items: ["Основание своего клуба", "Публичные выступления", "Дебаты и аргументация", "Проектный менеджмент"],
    highlight: false,
  },
];

export default function Subjects() {
  return (
    <div>
      <PageHeader
        eyebrow="Ученикам"
        title="Что можно изучать"
        lead="Школьные дисциплины, международные языковые сертификаты, исследовательские проекты и творческие клубы."
      />

      <section className="py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            {categories.map((cat) => (
              <div
                key={cat.title}
                className={`relative flex flex-col justify-between rounded-3xl border p-8 shadow-sm transition hover:shadow-md ${
                  cat.highlight
                    ? "border-mint-dark/40 bg-gradient-to-br from-mint/10 via-white to-white"
                    : "border-navy/10 bg-white"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                        cat.highlight ? "bg-mint text-navy" : "bg-navy/5 text-navy/70"
                      }`}
                    >
                      {cat.tag}
                    </span>
                    {cat.highlight && (
                      <span className="text-xs font-semibold text-mint-dark flex items-center gap-1">
                        ★ Рекомендуем
                      </span>
                    )}
                  </div>

                  <h3 className="mt-5 text-2xl font-extrabold text-navy">{cat.title}</h3>
                  <p className="mt-3 text-sm text-navy/70 leading-relaxed">{cat.description}</p>

                  <div className="mt-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-navy/50">
                      Что входит:
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {cat.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-offwhite px-3.5 py-1.5 text-xs font-semibold text-navy border border-navy/5"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-navy/5 pt-6">
                  <Button
                    href={enrollmentContact.whatsappUrl}
                    variant={cat.highlight ? "primary" : "outline"}
                    className={cat.highlight ? "" : "text-navy border-navy/20 hover:bg-navy hover:text-white"}
                  >
                    Записаться на направление
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Карточка записи и перехода */}
          <div className="mt-16 rounded-3xl border border-navy/10 bg-navy p-8 text-offwhite sm:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <span className="inline-block rounded-full bg-mint/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-mint">
                  Начни учиться бесплатно
                </span>
                <h3 className="mt-3 text-2xl font-extrabold text-offwhite sm:text-3xl">
                  Запись через Meyir-zhan foundation
                </h3>
                <p className="mt-3 text-sm text-offwhite/80 leading-relaxed">
                  Запись открыта для всех учеников. Для регистрации свяжитесь с представителем организации Каламкас Канатовной в WhatsApp ({enrollmentContact.phone}), и координаторы подберут для вас волонтёра-преподавателя на трёхмесячный поток.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Button href={enrollmentContact.whatsappUrl} variant="primary">
                  Написать в WhatsApp
                </Button>
                <Link
                  to="/students/lesson"
                  className="inline-flex items-center justify-center rounded-full border border-offwhite/30 px-6 py-3 text-sm font-semibold text-offwhite hover:border-mint hover:text-mint transition-colors"
                >
                  Как проходит урок →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
