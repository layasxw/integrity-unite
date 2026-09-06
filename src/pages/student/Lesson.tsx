import PageHeader from "../../components/PageHeader";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";
import { enrollmentContact } from "../../data/mock";

const steps = [
  {
    num: "1",
    title: "Выбор платформы",
    description:
      "Уроки проходят онлайн. Вы можете созвониться в Zoom, Google Meet, Telegram, WhatsApp или на любой другой платформе, где вам удобно общаться и включать демонстрацию экрана.",
  },
  {
    num: "2",
    title: "Длительность 40–60 минут",
    description:
      "Один урок длится от 40 до 60 минут. Этого достаточно, чтобы разобрать сложную тему, решить практические задачи и ответить на все вопросы без усталости.",
  },
  {
    num: "3",
    title: "Гибкий график",
    description:
      "Вы вместе с волонтёром договариваетесь о подходящих днях и времени занятий. График легко подстроить под ваши школьные уроки и кружки.",
  },
  {
    num: "4",
    title: "Потоки по 3 месяца",
    description:
      "Обучение организовано трёхмесячными циклами. За один поток ученик успевает существенно повысить свой уровень знаний и уверенность в предмете.",
  },
];

const checklist = [
  "Смартфон, планшет или компьютер с микрофоном",
  "Стабильное подключение к интернету",
  "Тетрадь, ручка и учебник (при необходимости)",
  "Список вопросов или тем, которые вызывают сложности",
  "Хорошее настроение и желание узнавать новое",
];

export default function Lesson() {
  return (
    <div>
      <PageHeader
        eyebrow="Ученикам"
        title="Как проходит урок"
        lead="Онлайн-занятия с заботливыми наставниками в удобном для вас темпе и формате."
      />

      <section className="py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((item) => (
              <div
                key={item.num}
                className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint/20 text-lg font-black text-navy">
                  {item.num}
                </span>
                <h3 className="mt-4 text-lg font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm text-navy/70 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Чеклист подготовки */}
          <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="rounded-3xl border border-navy/10 bg-white p-8 shadow-sm sm:p-10">
              <span className="rounded-full bg-navy/5 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-navy">
                Подготовка к уроку
              </span>
              <h3 className="mt-4 text-2xl font-extrabold text-navy">
                Что понадобится для занятия?
              </h3>
              <p className="mt-2 text-sm text-navy/70">
                Всё максимально просто — для учёбы не требуется никакого дорогостоящего оборудования.
              </p>

              <ul className="mt-6 space-y-3">
                {checklist.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-navy/80">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint text-xs font-bold text-navy">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-between rounded-3xl border border-navy/10 bg-gradient-to-br from-navy to-navy-light p-8 text-offwhite sm:p-10">
              <div>
                <span className="rounded-full bg-mint/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-mint">
                  Атмосфера уроков
                </span>
                <h3 className="mt-4 text-2xl font-extrabold text-offwhite">
                  Поддержка и никакого стресса
                </h3>
                <p className="mt-3 text-sm text-offwhite/80 leading-relaxed">
                  Наши волонтёры — это студенты, которые сами недавно сидели за школьной партой. Они понимают твои трудности, объяснят сложные формулы простыми словами и поддержат на каждом шаге. На уроках Integrity Unite нет двоек и критики — только уважение и совместный прогресс.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-offwhite/10 flex flex-col sm:flex-row gap-3">
                <Button href={enrollmentContact.whatsappUrl} variant="primary">
                  Записаться на уроки
                </Button>
                <Link
                  to="/students/schedule"
                  className="inline-flex items-center justify-center rounded-full border border-offwhite/30 px-6 py-3 text-sm font-semibold text-offwhite hover:border-mint hover:text-mint transition-colors"
                >
                  О расписании →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
