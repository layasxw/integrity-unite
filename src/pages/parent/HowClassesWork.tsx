import PageHeader from "../../components/PageHeader";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";
import { enrollmentContact } from "../../data/mock";

const classFeatures = [
  {
    title: "Онлайн-формат",
    value: "Zoom, Telegram, WhatsApp, Google Meet и др.",
    description:
      "Уроки проходят дистанционно. Вы можете подключиться с компьютера, планшета или смартфона через ту платформу, которая наиболее удобна вам и преподавателю.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
  {
    title: "Длительность урока",
    value: "40–60 минут",
    description:
      "Оптимальное время занятия, чтобы ребёнок сохранял концентрацию, успел разобрать новую тему, задать вопросы и закрепить практические задания без переутомления.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: "Гибкий график",
    value: "Индивидуальный выбор дня и времени",
    description:
      "Вы вместе с волонтёром согласовываете комфортный график, который легко совмещать со школой, кружками и семейными делами.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    title: "Потоковая система",
    value: "Циклы по 3 месяца",
    description:
      "Проект организован по трёхмесячным потокам. За это время ученик успевает освоить цельный модуль знаний или качественно подтянуть успеваемость по предмету.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
      </svg>
    ),
  },
];

export default function HowClassesWork() {
  return (
    <div>
      <PageHeader
        eyebrow="Родителям"
        title="Как проходят занятия"
        lead="Индивидуальный подход, удобная онлайн-платформа и расписание, согласованное прямо с вами."
      />

      <section className="py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {classFeatures.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-navy/10 bg-white p-8 shadow-sm transition hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint/20 text-navy">
                  {f.icon}
                </div>
                <h3 className="mt-5 text-xl font-bold text-navy">{f.title}</h3>
                <p className="mt-1 text-sm font-semibold text-mint-dark">{f.value}</p>
                <p className="mt-3 text-sm text-navy/70 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>

          {/* Кто проводит занятия */}
          <div className="mt-16 rounded-3xl border border-navy/10 bg-white p-8 shadow-sm sm:p-10">
            <div className="grid gap-8 lg:grid-cols-3 lg:items-center">
              <div className="lg:col-span-2">
                <span className="inline-block rounded-full bg-navy/5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy">
                  Преподавательский состав
                </span>
                <h3 className="mt-3 text-2xl font-extrabold text-navy">
                  Кто проводит занятия с детьми?
                </h3>
                <p className="mt-4 text-navy/70 leading-relaxed">
                  Занятия проводят волонтёры-студенты, прошедшие отбор, регистрацию и специальное распределение в проекте Integrity Unite. Наши волонтёры мотивированы делиться знаниями и создают доброжелательную, поддерживающую обстановку, где ребёнок не боится задавать вопросы и делать ошибки.
                </p>
                <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold text-navy/80">
                  <span className="rounded-full bg-offwhite px-3.5 py-1.5 border border-navy/10">✓ Студенты ведущих вузов</span>
                  <span className="rounded-full bg-offwhite px-3.5 py-1.5 border border-navy/10">✓ Индивидуальный темп</span>
                  <span className="rounded-full bg-offwhite px-3.5 py-1.5 border border-navy/10">✓ Без возрастных ограничений</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 rounded-2xl border border-navy/10 bg-offwhite p-6">
                <p className="text-sm font-bold text-navy">Готовы начать?</p>
                <p className="text-xs text-navy/70">
                  Запись учеников открыта через координатора партнёрской организации Meyir-zhan foundation.
                </p>
                <Button href={enrollmentContact.whatsappUrl} variant="primary" className="text-sm">
                  Записаться в WhatsApp
                </Button>
                <Link
                  to="/parents/enroll"
                  className="text-center text-xs font-medium text-navy/70 hover:text-navy underline underline-offset-2"
                >
                  Подробнее о порядке записи →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
