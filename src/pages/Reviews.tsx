import { useState, type FormEvent } from "react";
import PageHeader from "../components/PageHeader";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import { useApiData } from "../hooks/useApiData";
import { postJson } from "../lib/api";
import { reviews as reviewsFallback } from "../data/mock";

const ROLES = ["Волонтёр", "Родитель", "Ученик", "Партнёр"];

export default function Reviews() {
  const reviews = useApiData("/api/reviews", reviewsFallback);

  const [name, setName] = useState("");
  const [role, setRole] = useState("Волонтёр");
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) {
      setErrorMsg("Пожалуйста, заполните все поля.");
      return;
    }

    setSubmitting(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const data = await postJson<{ message: string }>("/api/reviews", { name, role, text });
      setSuccessMsg(data.message || "Спасибо за отзыв! Он появится после модерации.");
      setName("");
      setText("");
    } catch {
      setErrorMsg("Не удалось подключиться к серверу. Попробуйте ещё раз чуть позже.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader
        eyebrow="Отзывы"
        title="Отзывы"
        lead="Что говорят волонтёры, родители и ученики о своём опыте с Integrity Unite."
      />

      <section className="py-16">
        <Container>
          <div className="mb-12 rounded-3xl border border-navy/10 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold text-navy">Оставить отзыв</h3>
            <p className="mt-1 text-sm text-navy/70">
              Поделитесь вашим опытом участия в проекте. Отзывы проходят лёгкую модерацию перед публикацией.
            </p>

            {successMsg && (
              <div className="mt-4 rounded-xl border border-mint-dark/40 bg-mint/10 p-4 text-sm font-medium text-navy">
                ✓ {successMsg}
              </div>
            )}

            {errorMsg && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
                ✕ {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-navy/70">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Например: Алина М."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-navy/15 bg-offwhite/50 px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 focus:border-mint-dark focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-navy/70">
                    Ваша роль
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-navy/15 bg-offwhite/50 px-4 py-2.5 text-sm text-navy focus:border-mint-dark focus:bg-white focus:outline-none"
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-navy/70">
                  Текст отзыва
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Расскажите о ваших впечатлениях..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-navy/15 bg-offwhite/50 px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 focus:border-mint-dark focus:bg-white focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <Button type="submit" disabled={submitting} variant="primary">
                  {submitting ? "Отправка..." : "Отправить отзыв"}
                </Button>
              </div>
            </form>
          </div>

          <h3 className="mb-6 text-xl font-bold text-navy">Опубликованные отзывы</h3>
          {reviews.length === 0 ? (
            <div className="rounded-2xl border border-navy/10 bg-white p-8 text-center text-sm text-navy/60">
              Пока нет опубликованных отзывов — станьте первым!
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2">
              {reviews.map((r) => (
                <div key={r.id} className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-wide text-mint-dark">{r.role}</p>
                  <p className="mt-3 text-navy/80">«{r.text}»</p>
                  <p className="mt-4 text-sm font-medium text-navy">{r.name}</p>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
