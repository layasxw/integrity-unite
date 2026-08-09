import PageHeader from "../components/PageHeader";
import Container from "../components/ui/Container";
import SectionTitle from "../components/ui/SectionTitle";
import Button from "../components/ui/Button";
import { useApiData } from "../hooks/useApiData";
import { team as teamFallback, links } from "../data/mock";

const volunteerPerks = [
  "Опыт работы в международной организации",
  "Сертификаты и благодарственные письма за 20+ часов работы",
  "Возможность основать свой клуб или филиал и получить лидерский сертификат",
  "Менторство от кофаундера Полины по подготовке к IELTS (её балл — 8.0)",
];

export default function Team() {
  const team = useApiData("/api/team", teamFallback);

  return (
    <div>
      <PageHeader eyebrow="Команда" title="Команда и основатели" lead="Люди, которые стоят у истоков Integrity Unite." />

      <section className="py-24">
        <Container>
          <SectionTitle
            eyebrow="Основатели"
            title="Основатели и команда"
            description="Integrity Unite создали и развивают волонтёры, которые сами прошли путь от идеи до международного проекта."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <div key={member.id} className="rounded-2xl border border-navy/10 bg-offwhite p-8">
                <div className="flex items-center gap-4">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="h-14 w-14 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy text-xl font-bold text-mint">
                      {member.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="text-xl font-bold text-navy">{member.name}</p>
                    <p className="text-sm text-navy/60">{member.role}</p>
                  </div>
                </div>
                {member.bio && <p className="mt-4 text-sm text-navy/70">{member.bio}</p>}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy py-24">
        <Container>
          <SectionTitle
            light
            eyebrow="Почему мы"
            title="Почему стоит стать волонтёром у нас"
            description="Кроме опыта преподавания, ты получаешь поддержку команды, менторство и признание за свой вклад."
          />

          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {volunteerPerks.map((p) => (
              <li
                key={p}
                className="flex gap-3 rounded-2xl border border-offwhite/10 bg-navy-light p-4 text-sm text-offwhite/80"
              >
                <span className="text-mint">✓</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>

          <Button href={links.volunteerForm} variant="primary" className="mt-10">
            Стать волонтёром
          </Button>
        </Container>
      </section>
    </div>
  );
}
