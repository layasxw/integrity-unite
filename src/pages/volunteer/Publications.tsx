import { useState, type FormEvent } from "react";
import PageHeader from "../../components/PageHeader";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import { useApiData } from "../../hooks/useApiData";
import { postJson } from "../../lib/api";
import { publications as publicationsFallback } from "../../data/mock";

const benefits = [
  "Портфолио для вузов и работы",
  "Официальная публикация — весомый пункт в резюме",
  "Обмен опытом: твои идеи могут вдохновить других волонтёров по всему миру",
  "Развитие навыков письма — редакторская поддержка помогает улучшить текст",
  "Признание в сообществе как эксперта в нашей сети",
  "Практическое применение: исследования могут повлиять на проекты Integrity Unite",
];

const CATEGORIES = [
  "Исследовательская работа",
  "Практическое руководство",
  "Аналитический обзор",
  "Эссе",
  "Creative writing",
];

export default function Publications() {
  const publications = useApiData("/api/publications", publicationsFallback);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [excerpt, setExcerpt] = useState("");
  const [docUrl, setDocUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !excerpt.trim() || !docUrl.trim()) {
      setErrorMsg("Пожалуйста, заполните все поля.");
      return;
    }

    setSubmitting(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const data = await postJson<{ message: string }>("/api/publications", {
        title,
        author,
        category,
        excerpt,
        content: docUrl,
      });
      setSuccessMsg(data.message || "Статья отправлена на модерацию. Спасибо!");
      setTitle("");
      setAuthor("");
      setExcerpt("");
      setDocUrl("");
    } catch {
      setErrorMsg("Не удалось подключиться к серверу. Попробуйте ещё раз чуть позже.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader
        eyebrow="Волонтёрам"
        title="Research & Articles"
        lead="Публикуй свои исследования и статьи — Integrity Unite даёт волонтёрам платформу для публикации."
      />

      <section className="py-24">
        <Container>
          <h2 className="text-2xl font-extrabold tracking-tight text-navy">Зачем это нужно</h2>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {benefits.map((b) => (
              <li key={b} className="rounded-2xl border border-navy/10 bg-white p-4 text-sm text-navy/80 shadow-sm">
                {b}
              </li>
            ))}
          </ul>

          <h2 className="mt-16 text-2xl font-extrabold tracking-tight text-navy">Что мы публикуем</h2>
          <p className="mt-3 max-w-2xl text-navy/80">
            Исследовательские работы, практические руководства, аналитические обзоры, эссе,
            creative writing (поэзия, рассказы). Язык — русский, английский или
            билингвальный формат. Мы помогаем с редактурой, но текст должен быть грамотным.
          </p>

          <h2 className="mt-16 text-2xl font-extrabold tracking-tight text-navy">Подать работу</h2>
          <p className="mt-3 max-w-2xl text-navy/80">
            Загрузи текст в Google Docs, открой доступ «у кого есть ссылка — может
            просматривать» и вставь ссылку в форму ниже. Модерация — до 7 дней.
          </p>

          <div className="mt-6 rounded-3xl border border-navy/10 bg-white p-8 shadow-sm">
            {successMsg && (
              <div className="mb-4 rounded-xl border border-mint-dark/40 bg-mint/10 p-4 text-sm font-medium text-navy">
                ✓ {successMsg}
              </div>
            )}
            {errorMsg && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
                ✕ {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-navy/70">
                    Название работы
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-navy/15 bg-offwhite/50 px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 focus:border-mint-dark focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-navy/70">
                    Автор
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Например: Алина М."
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-navy/15 bg-offwhite/50 px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 focus:border-mint-dark focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-navy/70">
                  Категория
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-navy/15 bg-offwhite/50 px-4 py-2.5 text-sm text-navy focus:border-mint-dark focus:bg-white focus:outline-none"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-navy/70">
                  Краткое описание (2-3 предложения)
                </label>
                <textarea
                  rows={3}
                  required
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-navy/15 bg-offwhite/50 px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 focus:border-mint-dark focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-navy/70">
                  Ссылка на Google Doc
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://docs.google.com/document/d/..."
                  value={docUrl}
                  onChange={(e) => setDocUrl(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-navy/15 bg-offwhite/50 px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 focus:border-mint-dark focus:bg-white focus:outline-none"
                />
                <p className="mt-1 text-xs text-navy/50">
                  Проверь, что доступ открыт «у кого есть ссылка» — иначе модератор не увидит текст.
                </p>
              </div>

              <div className="pt-2">
                <Button type="submit" disabled={submitting} variant="primary">
                  {submitting ? "Отправка..." : "Отправить на модерацию"}
                </Button>
              </div>
            </form>
          </div>

          <h2 className="mt-16 text-2xl font-extrabold tracking-tight text-navy">Опубликованные работы</h2>
          <div className="mt-6 space-y-4">
            {publications.map((pub) => (
              <div key={pub.id} className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-mint-dark">
                  {pub.category}
                </p>
                <p className="mt-1 text-lg font-bold text-navy">{pub.title}</p>
                <p className="mt-2 text-sm text-navy/70">{pub.excerpt}</p>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xs text-navy/50">
                    {pub.author} · {new Date(pub.date).toLocaleDateString("ru-RU")}
                  </p>
                  {pub.content && (
                    <a
                      href={pub.content}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-mint-dark underline"
                    >
                      Читать полностью →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
