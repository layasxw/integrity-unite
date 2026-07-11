import PageHeader from "../../components/PageHeader";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import { branches, links } from "../../data/mock";

const responsibilities = [
  "Открывает и представляет филиал Integrity Unite в своей школе, городе или регионе",
  "Набирает и вдохновляет команду волонтёров (от 3 до 10+ человек)",
  "Организует встречи, воркшопы, дискуссии и социальные акции",
  "Продвигает ценности проекта в своём сообществе",
  "Координирует работу филиала с центральной командой Integrity Unite",
];

const perks = [
  "Официальный статус главы филиала — строчка в резюме и портфолио для вузов и работодателей",
  "Опыт управления проектом — навыки, которые ценятся везде, от волонтёрства до карьеры",
  "Сертификат и рекомендательное письмо, подтверждающие лидерские качества",
  "Поддержка центральной команды — идеи, материалы, PR-поддержка",
  "Международное сообщество — часть глобальной сети лидеров Integrity Unite",
];

export default function Branches() {
  return (
    <div>
      <PageHeader
        eyebrow="Волонтёрам"
        title="Филиалы"
        lead="Стань главой филиала Integrity Unite — лидерская позиция для тех, кто хочет не участвовать, а создавать: команду, события и изменения."
      />

      <section className="py-24">
        <Container>
          <h2 className="text-2xl font-extrabold tracking-tight text-navy">
            Что значит «глава филиала»?
          </h2>
          <ul className="mt-6 space-y-3">
            {responsibilities.map((r) => (
              <li key={r} className="flex gap-3 rounded-2xl border border-navy/10 bg-white p-4 text-sm text-navy/80 shadow-sm">
                <span className="text-mint-dark">•</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-16 text-2xl font-extrabold tracking-tight text-navy">Что ты получишь</h2>
          <ul className="mt-6 space-y-3">
            {perks.map((p) => (
              <li key={p} className="flex gap-3 rounded-2xl border border-navy/10 bg-white p-4 text-sm text-navy/80 shadow-sm">
                <span className="text-yellow">✓</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-16 text-2xl font-extrabold tracking-tight text-navy">
            Действующие и открытые филиалы
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {branches.map((b) => (
              <div key={b.id} className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm">
                <p className="font-bold text-navy">{b.city}</p>
                <p className="mt-1 text-sm text-navy/60">{b.lead}</p>
              </div>
            ))}
          </div>

          <Button href={links.branchForm} variant="primary" className="mt-10">
            Подать заявку на главу филиала
          </Button>
        </Container>
      </section>
    </div>
  );
}
