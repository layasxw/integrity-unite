import PageHeader from "../components/PageHeader";
import Container from "../components/ui/Container";
import { useApiData } from "../hooks/useApiData";
import { reviews as reviewsFallback } from "../data/mock";

export default function Reviews() {
  const reviews = useApiData("/api/reviews", reviewsFallback);

  return (
    <div>
      <PageHeader
        eyebrow="Отзывы"
        title="Отзывы"
        lead="Что говорят волонтёры, родители и ученики о своём опыте с Integrity Unite."
      />

      <section className="py-24">
        <Container>
          <div className="rounded-2xl border border-mint-dark/40 bg-white p-5 text-sm text-navy/70 shadow-sm">
            Модерация на бэкенде уже готова (новый отзыв уходит на проверку и появляется
            здесь только после одобрения) — не хватает только формы отправки на сайте,
            добавим следующим шагом.
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {reviews.map((r) => (
              <div key={r.id} className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wide text-mint-dark">{r.role}</p>
                <p className="mt-3 text-navy/80">«{r.text}»</p>
                <p className="mt-4 text-sm font-medium text-navy">{r.name}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
