import PageHeader from "../../components/PageHeader";
import Container from "../../components/ui/Container";
import { clubs, links } from "../../data/mock";

export default function Clubs() {
  return (
    <div>
      <PageHeader
        eyebrow="Волонтёрам"
        title="Клубы"
        lead="Волонтёры-преподаватели могут проявить себя в роли лидера, основав собственный тематический клуб — другие волонтёры смогут в нём участвовать и получить за это дополнительные сертификаты."
      />

      <section className="py-24">
        <Container>
          <div className="grid gap-5 sm:grid-cols-3">
            {clubs.map((club) => (
              <div key={club.id} className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
                <p className="font-bold text-navy">{club.name}</p>
                <p className="mt-2 text-sm text-navy/70">{club.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-navy/10 bg-mint/15 p-6">
            <p className="font-semibold text-navy">Хотите основать свой клуб?</p>
            <p className="mt-1 text-sm text-navy/70">Пишите нам:</p>
            <a href={`mailto:${links.contactEmail}`} className="text-navy underline">
              {links.contactEmail}
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
}
