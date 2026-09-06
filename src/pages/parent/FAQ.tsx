import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import { enrollmentContact } from "../../data/mock";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Бесплатно ли это?",
    answer:
      "Да, все занятия абсолютно бесплатны. Наша миссия – сделать качественное образование доступным каждому ребёнку независимо от дохода семьи.",
  },
  {
    question: "Кто проводит занятия?",
    answer:
      "Занятия проводят волонтеры-студенты, прошедшие регистрацию и распределение в проекте. Это мотивированные ребята из ведущих вузов разных стран.",
  },
  {
    question: "Сколько длятся уроки?",
    answer:
      "Обычно 40–60 минут. Вы вместе с волонтером выбираете удобное время и регулярность занятий.",
  },
  {
    question: "На какой платформе проходят занятия?",
    answer:
      "Любая удобная платформа: Zoom, Telegram, WhatsApp, Google Meet и др. Вы договариваетесь с преподавателем о том, что комфортнее использовать вам.",
  },
  {
    question: "Есть ли ограничения по возрасту?",
    answer:
      "Для учеников ограничений нет. Мы помогаем школьникам любых классов, а также ребятам, желающим изучать языки или развивать лидерские навыки.",
  },
  {
    question: "Как записать ребёнка на занятия?",
    answer:
      `Регистрация учеников проводится через партнёрскую организацию Meyir-zhan foundation. Для записи нужно связаться с представителем организации по номеру WhatsApp (${enrollmentContact.phone}, ${enrollmentContact.representative}). После регистрации координаторы проекта распределяют учеников к волонтёрам в течение потока.`,
  },
  {
    question: "Какие документы подписываются перед началом занятий?",
    answer:
      "Перед началом занятий родители или законные представители подписывают согласие на фото- и видеосъёмку во время уроков. В этом же документе отдельно указывается, разрешаете ли вы публиковать материалы в соцсетях и на сайте проекта. Все бумаги хранятся строго согласно политике конфиденциальности организации.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Родителям"
        title="Часто задаваемые вопросы"
        lead="Ответы на ключевые вопросы родителей о стоимости, преподавателях, безопасности и формате обучения."
      />

      <section className="py-20">
        <Container className="max-w-4xl">
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm transition"
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="flex w-full items-center justify-between p-6 text-left transition hover:bg-navy/[0.02]"
                    aria-expanded={isOpen}
                  >
                    <span className="text-lg font-bold text-navy pr-4">{faq.question}</span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy/5 text-navy transition-transform duration-200 ${
                        isOpen ? "rotate-180 bg-mint text-navy" : ""
                      }`}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-navy/5 px-6 pb-6 pt-4">
                      <p className="text-navy/70 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-14 rounded-2xl border border-navy/10 bg-white p-8 text-center shadow-sm">
            <h3 className="text-xl font-bold text-navy">Не нашли ответ на свой вопрос?</h3>
            <p className="mt-2 text-sm text-navy/70">
              Свяжитесь с представителем партнёрской организации Meyir-zhan foundation ({enrollmentContact.representative}) в WhatsApp.
            </p>
            <Button
              href={enrollmentContact.whatsappUrl}
              variant="primary"
              className="mt-6 inline-flex"
            >
              Задать вопрос в WhatsApp
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
