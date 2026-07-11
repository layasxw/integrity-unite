import PageHeader from "../components/PageHeader";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import { cohortSchedule, links } from "../data/mock";

export default function Schedule() {
  const pastCohorts = cohortSchedule.slice(0, -1);
  const openCohort = cohortSchedule[cohortSchedule.length - 1];

  return (
    <div>
      <PageHeader
        eyebrow="Расписание"
        title="Расписание потоков"
        lead="Проект работает циклами — каждый поток длится 3 месяца. График обновляется по мере набора."
      />

      <section className="py-24">
        <Container>
          <div className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm">
            {pastCohorts.map((c, i) => (
              <div
                key={c.id}
                className={`flex items-center gap-4 px-6 py-4 ${
                  i !== pastCohorts.length - 1 ? "border-b border-navy/10" : ""
                }`}
              >
                {/* TODO: заменить на реальное фото/результаты потока, когда появятся */}
                <div className="h-12 w-16 shrink-0 rounded-lg bg-gradient-to-br from-mint/40 to-navy/20 blur-[2px]" />
                <div className="flex flex-1 items-center justify-between">
                  <span className="font-medium text-navy">{c.name}</span>
                  <span className="text-sm text-navy/60">{c.period}</span>
                </div>
              </div>
            ))}

            <div className="flex flex-col gap-4 border-t-2 border-mint-dark bg-mint/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="font-bold text-navy">{openCohort.name}</span>
                <span className="ml-2 text-sm text-navy/60">{openCohort.period}</span>
              </div>
              <Button href={links.volunteerForm} variant="primary" className="px-5 py-2 text-sm">
                Оставить заявку
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
