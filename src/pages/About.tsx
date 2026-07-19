import PageHeader from "../components/PageHeader";
import Container from "../components/ui/Container";
import SectionTitle from "../components/ui/SectionTitle";
import WorldMap from "../components/WorldMap";
import { useApiData } from "../hooks/useApiData";
import { stats as statsFallback, volunteerCountries as countriesFallback } from "../data/mock";

export default function About() {
  const stats = useApiData("/api/stats", statsFallback);
  const volunteerCountries = useApiData("/api/volunteers/countries", countriesFallback);

  return (
    <div>
      <PageHeader
        eyebrow="О проекте"
        title="О проекте"
        lead="Integrity Unite — некоммерческая волонтёрская организация, предоставляющая обучение по различным дисциплинам детям из малоимущих и многодетных семей."
      />

      <section className="py-24">
        <Container>
          <SectionTitle
            eyebrow="Миссия"
            title="Наша миссия"
            description="Сделать качественное образование бесплатным и доступным для каждого ребёнка, независимо от его места жительства или дохода семьи, за счёт работы наших волонтёров."
          />

          <div className="mt-16">
            <h3 className="text-lg font-bold text-navy">Статистика</h3>
            <p className="mt-2 max-w-2xl text-navy/70">
              Проект функционирует с 30.01.2024 по настоящее время. За этот период
              проведено 7 потоков, каждый длительностью 3 месяца.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {stats.slice(1).map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-navy/10 bg-white p-6 text-center shadow-sm"
                >
                  <p className="text-3xl font-extrabold text-navy">{s.value}</p>
                  <p className="mt-2 text-sm text-navy/60">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <h3 className="text-lg font-bold text-navy">География волонтёров</h3>
            <div className="mt-4 overflow-hidden rounded-2xl border border-navy/10">
              <WorldMap />
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {volunteerCountries.map((c) => (
                <span key={c} className="rounded-full bg-mint/15 px-4 py-2 text-sm font-medium text-navy">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
