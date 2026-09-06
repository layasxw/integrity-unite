import PageHeader from "../../components/PageHeader";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";
import { enrollmentContact } from "../../data/mock";

const steps = [
  {
    step: "01",
    title: "Регистрация через партнёра",
    description:
      "Регистрация учеников проводится через официальную партнёрскую организацию Meyir-zhan foundation, которая помогает централизованно принимать заявки от семей.",
  },
  {
    step: "02",
    title: "Связь в WhatsApp",
    description:
      "Для записи свяжитесь с представителем организации Каламкас Канатовной в WhatsApp. Сообщите имя ребёнка, класс, город и предметы, которые хотите подтянуть.",
  },
  {
    step: "03",
    title: "Распределение к волонтёру",
    description:
      "После регистрации координаторы Integrity Unite подбирают подходящего волонтёра-преподавателя и распределяют ученика в течение текущего трёхмесячного потока.",
  },
  {
    step: "04",
    title: "Согласие и первый урок",
    description:
      "Родители подписывают согласие на безопасность и фото/видеосъёмку, после чего волонтёр связывается с вами для согласования удобного дня и времени уроков.",
  },
];

export default function HowToEnroll() {
  return (
    <div>
      <PageHeader
        eyebrow="Родителям"
        title="Как записать ребёнка"
        lead="Все уроки в Integrity Unite полностью бесплатны. Запись проходит через партнёрскую организацию Meyir-zhan foundation."
      />

      <section className="py-20">
        <Container>
          {/* Быстрая карточка связи */}
          <div className="rounded-3xl border border-navy/10 bg-white p-8 shadow-sm sm:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-mint/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-navy">
                  Партнёрская регистрация
                </span>
                <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
                  {enrollmentContact.partner}
                </h2>
                <p className="mt-2 text-navy/70 leading-relaxed">
                  Представитель организации:{" "}
                  <strong className="text-navy font-semibold">{enrollmentContact.representative}</strong>.
                  Свяжитесь по WhatsApp, чтобы подать заявку на участие ребёнка в проекте.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Button
                  href={enrollmentContact.whatsappUrl}
                  variant="primary"
                  className="flex items-center gap-2 shadow-sm"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                  </svg>
                  Написать в WhatsApp ({enrollmentContact.phone})
                </Button>
              </div>
            </div>
          </div>

          {/* Пошаговый процесс */}
          <div className="mt-20">
            <h2 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
              Порядок записи и распределения
            </h2>
            <p className="mt-2 max-w-2xl text-navy/70">
              Мы стремимся сделать процесс начала занятий простым, прозрачным и комфортным для каждой семьи.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((item) => (
                <div
                  key={item.step}
                  className="relative rounded-2xl border border-navy/10 bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <span className="text-3xl font-black text-mint-dark/50">{item.step}</span>
                  <h3 className="mt-3 text-lg font-bold text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm text-navy/70 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Важная информация о потоках и стоимости */}
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-navy/10 bg-white p-7 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint/20 text-navy font-bold">
                  ✓
                </div>
                <h3 className="text-lg font-bold text-navy">100% бесплатно</h3>
              </div>
              <p className="mt-3 text-sm text-navy/70 leading-relaxed">
                Все уроки и материалы предоставляются абсолютно бесплатно. Никаких скрытых платежей, взносов или платных подписок. Наша миссия — сделать качественное образование доступным каждому ребёнку.
              </p>
            </div>

            <div className="rounded-2xl border border-navy/10 bg-white p-7 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow/20 text-navy font-bold">
                  3м
                </div>
                <h3 className="text-lg font-bold text-navy">Обучение по потокам</h3>
              </div>
              <p className="mt-3 text-sm text-navy/70 leading-relaxed">
                Проект работает циклами по 3 месяца. После регистрации координаторы закрепляют за учеником волонтёра на весь поток, гарантируя системный подход к обучению.
              </p>
            </div>
          </div>

          {/* Полезные ссылки */}
          <div className="mt-16 rounded-2xl border border-navy/10 bg-offwhite p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-bold text-navy">Остались вопросы перед записью?</p>
              <p className="text-sm text-navy/70">
                Ознакомьтесь с ответами на частые вопросы и правилами безопасности на уроках.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/parents/faq"
                className="rounded-full border border-navy/20 bg-white px-5 py-2 text-sm font-semibold text-navy hover:bg-navy hover:text-offwhite transition-colors"
              >
                Частые вопросы (FAQ)
              </Link>
              <Link
                to="/parents/safety"
                className="rounded-full border border-navy/20 bg-white px-5 py-2 text-sm font-semibold text-navy hover:bg-navy hover:text-offwhite transition-colors"
              >
                Безопасность
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
