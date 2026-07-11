import { Link } from "react-router-dom";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import SectionTitle from "../components/ui/SectionTitle";
import WorldMap from "../components/WorldMap";
import { stats, volunteerCountries, links } from "../data/mock";

function ScrollCue() {
  return (
    <button
      type="button"
      aria-label="Пролистать вниз"
      onClick={() => window.scrollTo({ top: window.innerHeight * 0.85, behavior: "smooth" })}
      className="absolute bottom-6 right-6 z-10 flex h-11 w-11 animate-bounce items-center justify-center rounded-full border border-offwhite/20 bg-offwhite/5 text-offwhite backdrop-blur transition hover:border-mint hover:text-mint sm:bottom-10 sm:right-10"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

export default function Home() {
  return (
    <div>
      <section className="relative flex min-h-[92svh] items-center overflow-hidden bg-navy">
        <div
          className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-mint/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-yellow/10 blur-3xl"
          aria-hidden
        />

        <Container className="relative py-16">
          <span className="inline-block rounded-full bg-offwhite/10 px-4 py-1 text-sm font-semibold text-mint">
            Некоммерческая волонтёрская организация
          </span>

          <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-offwhite sm:text-6xl">
            Качественное образование — <span className="text-mint">бесплатно и доступно</span>{" "}
            каждому ребёнку
          </h1>

          <p className="mt-8 max-w-2xl text-lg text-offwhite/70">
            Integrity Unite обучает детей из малоимущих и многодетных семей силами
            волонтёров со всего мира — независимо от места жительства или дохода семьи.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={links.volunteerForm} variant="primary">
              Стать волонтёром
            </Button>
            <Button href="/about" variant="outline">
              Узнать больше
            </Button>
          </div>

          <div className="mt-14 max-w-md rounded-2xl border border-offwhite/10 bg-navy-light p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-mint">
              Следующий набор волонтёров
            </p>
            <p className="mt-2 text-2xl font-bold text-offwhite">10 июля</p>
            <p className="mt-4 text-sm text-offwhite/70">
              Опыт работы в международной организации, менторство, сертификаты за 20+ часов
              и борьба за титулы лучших волонтёров при 30+ часах.
            </p>
          </div>
        </Container>

        <ScrollCue />
      </section>

      <section className="py-24">
        <Container>
          <SectionTitle eyebrow="Цифры" title="Проект в цифрах" />
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-navy/10 bg-white p-6 text-center shadow-sm"
              >
                <p className="text-3xl font-extrabold text-navy">{s.value}</p>
                <p className="mt-2 text-sm text-navy/60">{s.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-24">
        <Container>
          <h2 className="text-lg font-bold text-navy">География наших волонтёров</h2>
          <div className="mt-6 overflow-hidden rounded-2xl border border-navy/10">
            <WorldMap />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {volunteerCountries.map((c) => (
              <span key={c} className="rounded-full bg-mint/15 px-4 py-2 text-sm font-medium text-navy">
                {c}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            <Link
              to="/volunteer"
              className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm transition hover:shadow-lg"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-mint-dark">
                Волонтёрам
              </p>
              <p className="mt-2 text-lg font-bold text-navy">Как присоединиться</p>
              <p className="mt-2 text-sm text-navy/70">
                Клубы, филиалы, публикации и титулы лучших волонтёров.
              </p>
            </Link>
            <Link
              to="/parents/enroll"
              className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm transition hover:shadow-lg"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-yellow">
                Родителям
              </p>
              <p className="mt-2 text-lg font-bold text-navy">Как записать ребёнка</p>
              <p className="mt-2 text-sm text-navy/70">
                Что нужно знать перед началом занятий и кто преподаёт.
              </p>
            </Link>
            <Link
              to="/students/subjects"
              className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm transition hover:shadow-lg"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-navy">
                Ученикам
              </p>
              <p className="mt-2 text-lg font-bold text-navy">Что можно изучать</p>
              <p className="mt-2 text-sm text-navy/70">
                Предметы, формат уроков и расписание занятий.
              </p>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
