import PageHeader from "../../components/PageHeader";
import Container from "../../components/ui/Container";
import { topVolunteers } from "../../data/mock";

export default function TopVolunteers() {
  return (
    <div>
      <PageHeader
        eyebrow="Волонтёрам"
        title="Лучшие волонтёры"
        lead="Волонтёры, отмеченные титулами Best National Volunteer и Best International Volunteer за вклад в проект."
      />

      <section className="py-24">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2">
            {topVolunteers.map((v) => (
              <div key={v.id} className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-yellow">{v.award}</p>
                <p className="mt-1 text-xl font-bold text-navy">{v.name}</p>
                <p className="mt-1 text-sm text-navy/50">{v.cohort}</p>
                <p className="mt-3 text-sm text-navy/70">{v.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
