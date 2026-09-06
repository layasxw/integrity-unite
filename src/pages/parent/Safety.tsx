import PageHeader from "../../components/PageHeader";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";
import { enrollmentContact } from "../../data/mock";

const safetyRules = [
  {
    title: "Письменное согласие родителей",
    description:
      "Перед началом занятий родители или законные представители подписывают согласие на фото- и видеосъёмку во время уроков. Без этого согласия ребёнок не допускается к онлайн-урокам.",
    badge: "Обязательно",
  },
  {
    title: "Право на публикацию материалов",
    description:
      "В том же документе родители отдельно указывают, разрешают ли они публиковать фото и видеоматериалы в социальных сетях и на официальном сайте Integrity Unite. Вы вправе как разрешить, так и отказаться от публичного размещения.",
    badge: "Ваш выбор",
  },
  {
    title: "Строгая конфиденциальность",
    description:
      "Все подписанные согласия, персональные данные детей и родителей надёжно хранятся в строгом соответствии с политикой конфиденциальности организации и не передаются третьим лицам.",
    badge: "Защита данных",
  },
  {
    title: "Отбор волонтёров-преподавателей",
    description:
      "Все занятия проводят волонтёры-студенты, прошедшие обязательную регистрацию, верификацию и инструктаж по педагогической этике и нормам безопасности при взаимодействии с детьми.",
    badge: "Проверка",
  },
];

export default function Safety() {
  return (
    <div>
      <PageHeader
        eyebrow="Родителям"
        title="Безопасность и преподаватели"
        lead="Мы создаём безопасное, этичное и доверительное пространство для каждого ребёнка."
      />

      <section className="py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {safetyRules.map((rule) => (
              <div
                key={rule.title}
                className="rounded-2xl border border-navy/10 bg-white p-8 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-mint/20 px-3 py-1 text-xs font-bold text-navy">
                    {rule.badge}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-navy">{rule.title}</h3>
                <p className="mt-3 text-sm text-navy/70 leading-relaxed">{rule.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-3xl border border-navy/10 bg-navy p-8 text-offwhite sm:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <span className="inline-block rounded-full bg-mint/20 px-3 py-1 text-xs font-semibold text-mint">
                  Доверие и забота
                </span>
                <h3 className="mt-3 text-2xl font-extrabold text-offwhite sm:text-3xl">
                  Контроль качества уроков
                </h3>
                <p className="mt-3 text-sm text-offwhite/80 leading-relaxed">
                  В проекте работает команда контроля качества и секретариата. Если у вас возникнут любые пожелания или вопросы по взаимодействию с волонтёром, координаторы всегда на связи и оперативно помогут решить любую ситуацию.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Button href={enrollmentContact.whatsappUrl} variant="primary" className="text-sm">
                  Записаться через WhatsApp
                </Button>
                <Link
                  to="/parents/faq"
                  className="inline-flex items-center justify-center rounded-full border border-offwhite/30 px-6 py-3 text-sm font-semibold text-offwhite hover:border-mint hover:text-mint transition-colors"
                >
                  Читать FAQ
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
