import PageHeader from "../../components/PageHeader";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";
import { useApiData } from "../../hooks/useApiData";
import { cohortSchedule as cohortsFallback, enrollmentContact } from "../../data/mock";

export default function StudentSchedule() {
  const cohortSchedule = useApiData("/api/cohorts", cohortsFallback);
  const activeCohort = cohortSchedule.find((c) => c.is_active) ?? cohortSchedule[cohortSchedule.length - 1];

  return (
    <div>
      <PageHeader
        eyebrow="Ученикам"
        title="Расписание уроков"
        lead="Индивидуальный график занятий: вы сами определяете удобные дни и время вместе со своим наставником."
      />

      <section className="py-20">
        <Container>
          {/* Главный блок с принципом расписания */}
          <div className="rounded-3xl border border-navy/10 bg-white p-8 shadow-sm sm:p-10">
            <div className="grid gap-8 lg:grid-cols-3 lg:items-center">
              <div className="lg:col-span-2">
                <span className="inline-block rounded-full bg-mint/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-navy">
                  Индивидуальный формат
                </span>
                <h2 className="mt-4 text-2xl font-extrabold text-navy sm:text-3xl">
                  Расписание формируется персонально для вас
                </h2>
                <p className="mt-3 text-navy/70 leading-relaxed">
                  У нас нет жесткой фиксированной сетки уроков, которая бы заставляла подстраиваться под общие звонки. После того как координаторы проекта распределяют ученика к волонтёру, вы связываетесь напрямую и выбираете комфортные часы для занятий.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-navy/5 bg-offwhite p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-navy/50">Длительность</p>
                    <p className="mt-1 text-lg font-extrabold text-navy">40–60 минут</p>
                  </div>
                  <div className="rounded-xl border border-navy/5 bg-offwhite p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-navy/50">Платформа</p>
                    <p className="mt-1 text-lg font-extrabold text-navy">Zoom, WA, TG, Meet</p>
                  </div>
                  <div className="rounded-xl border border-navy/5 bg-offwhite p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-navy/50">Длина потока</p>
                    <p className="mt-1 text-lg font-extrabold text-navy">3 месяца</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-mint-dark/30 bg-mint/10 p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-navy">Текущий набор</p>
                <p className="mt-2 text-2xl font-black text-navy">{activeCohort.name}</p>
                <p className="mt-1 text-sm font-medium text-navy/70">{activeCohort.period}</p>
                <p className="mt-4 text-xs text-navy/70">
                  Запись в поток проводится через координатора партнёрской организации Meyir-zhan foundation.
                </p>
                <Button
                  href={enrollmentContact.whatsappUrl}
                  variant="primary"
                  className="mt-5 w-full text-center text-sm"
                >
                  Записаться в WhatsApp
                </Button>
              </div>
            </div>
          </div>

          {/* Как происходит согласование времени */}
          <div className="mt-16">
            <h3 className="text-2xl font-extrabold tracking-tight text-navy">
              Как вы договоритесь о времени занятий
            </h3>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
                <span className="text-2xl font-black text-mint-dark">1</span>
                <h4 className="mt-2 text-lg font-bold text-navy">Запись и анкета</h4>
                <p className="mt-2 text-sm text-navy/70 leading-relaxed">
                  Вы связываетесь с представителем Meyir-zhan foundation ({enrollmentContact.representative}) и указываете нужные предметы и примерное удобное время.
                </p>
              </div>

              <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
                <span className="text-2xl font-black text-mint-dark">2</span>
                <h4 className="mt-2 text-lg font-bold text-navy">Распределение волонтёра</h4>
                <p className="mt-2 text-sm text-navy/70 leading-relaxed">
                  Координаторы Integrity Unite подбирают волонтёра-студента с совпадающим часовым поясом и графиком.
                </p>
              </div>

              <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
                <span className="text-2xl font-black text-mint-dark">3</span>
                <h4 className="mt-2 text-lg font-bold text-navy">Фиксация расписания</h4>
                <p className="mt-2 text-sm text-navy/70 leading-relaxed">
                  Волонтёр связывается с вами, вы утверждаете дни недели и часы уроков и начинаете 3-месячный цикл занятий.
                </p>
              </div>
            </div>
          </div>

          {/* Навигационные ссылки */}
          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-navy/10 bg-offwhite p-6">
            <div>
              <p className="font-bold text-navy">Хотите узнать больше о программе?</p>
              <p className="text-sm text-navy/70">
                Посмотрите доступные предметы или прочитайте, как устроен онлайн-урок.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/students/subjects"
                className="rounded-full border border-navy/20 bg-white px-5 py-2 text-sm font-semibold text-navy hover:bg-navy hover:text-offwhite transition-colors"
              >
                Что можно изучать
              </Link>
              <Link
                to="/students/lesson"
                className="rounded-full border border-navy/20 bg-white px-5 py-2 text-sm font-semibold text-navy hover:bg-navy hover:text-offwhite transition-colors"
              >
                Как проходит урок
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
