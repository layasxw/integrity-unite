import { Link } from "react-router-dom";
import Container from "./ui/Container";
import PlaceholderCard from "./ui/PlaceholderCard";

/**
 * Заглушка для разделов, по которым в ТЗ пока мало контента
 * (родительский и ученический треки). Легко найти и заменить —
 * ищи компонент <Stub /> по проекту.
 */
export default function Stub({ note }: { note?: string }) {
  return (
    <section className="py-24">
      <Container className="max-w-3xl">
        <div className="rounded-2xl border border-navy/10 bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-mint-dark">
            Раздел в разработке
          </p>
          <p className="mt-3 text-navy/80">
            {note ??
              "Контент для этой страницы ещё уточняется командой проекта. Здесь появится подробное описание."}
          </p>
          <Link to="/" className="mt-6 inline-block rounded-full bg-navy px-5 py-2 text-sm font-semibold text-offwhite">
            На главную
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <PlaceholderCard tag="скоро" />
          <PlaceholderCard tag="скоро" />
          <PlaceholderCard tag="скоро" />
        </div>
      </Container>
    </section>
  );
}
