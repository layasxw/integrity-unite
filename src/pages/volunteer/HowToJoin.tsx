import PageHeader from "../../components/PageHeader";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import { links } from "../../data/mock";

const perks = [
  "Опыт работы в международной организации",
  "Участие в закрытых вебинарах и тематических клубах",
  "Возможность основать собственный клуб и получить сертификат лидера",
  "Сертификаты и благодарственные письма за 20+ часов работы",
  "Борьба за титулы Best National Volunteer и Best International Volunteer (от 30+ часов)",
  "Менторство от кофаундера Полины по подготовке к IELTS (её балл — 8.0)",
];

export default function HowToJoin() {
  return (
    <div>
      <PageHeader
        eyebrow="Волонтёрам"
        title="Как стать волонтёром"
        lead="Integrity Unite открывает новый поток! Нужны только ваше желание и мотивация изменить чью-то жизнь к лучшему."
      />

      <section className="py-24">
        <Container>
          <h2 className="text-2xl font-extrabold tracking-tight text-navy">Что мы предлагаем</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {perks.map((p) => (
              <li key={p} className="flex gap-3 rounded-2xl border border-navy/10 bg-white p-4 shadow-sm">
                <span className="text-mint-dark">✓</span>
                <span className="text-sm text-navy/80">{p}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-16 text-2xl font-extrabold tracking-tight text-navy">Условия участия</h2>
          <p className="mt-3 max-w-2xl text-navy/80">
            Вам должно быть больше 14 лет. Никаких других ограничений — нужны только ваше
            желание и мотивация изменить чью-то жизнь к лучшему!
          </p>

          <Button href={links.volunteerForm} variant="primary" className="mt-8">
            Заполнить анкету волонтёра
          </Button>
        </Container>
      </section>
    </div>
  );
}
