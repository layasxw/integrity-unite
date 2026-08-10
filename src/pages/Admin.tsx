import { useState, useEffect, type FormEvent } from "react";
import PageHeader from "../components/PageHeader";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import { fetchJson, postJson, patchJson, ApiError } from "../lib/api";

interface ReviewItem {
  id: string;
  name: string;
  role: string;
  text: string;
  status: "pending" | "approved" | "rejected";
  date: string;
}

interface PublicationItem {
  id: string;
  title: string;
  author: string;
  category: string;
  excerpt: string;
  content?: string;
  status: "draft" | "published" | "rejected";
  date: string;
}

type Tab = "reviews" | "publications";

const REVIEW_FILTERS = ["pending", "approved", "rejected", "all"] as const;
const PUBLICATION_FILTERS = ["draft", "published", "rejected", "all"] as const;

export default function Admin() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("adminToken"));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState<Tab>("reviews");
  const [actionMsg, setActionMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [reviewFilter, setReviewFilter] = useState<(typeof REVIEW_FILTERS)[number]>("pending");

  const [publications, setPublications] = useState<PublicationItem[]>([]);
  const [publicationFilter, setPublicationFilter] = useState<(typeof PUBLICATION_FILTERS)[number]>("draft");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");

    try {
      const data = await postJson<{ access_token: string }>("/api/admin/login", { username, password });
      localStorage.setItem("adminToken", data.access_token);
      setToken(data.access_token);
      setUsername("");
      setPassword("");
    } catch (err) {
      if (err instanceof ApiError) {
        setLoginError(err.status === 401 ? "Неверный логин или пароль" : `Ошибка сервера (${err.status})`);
      } else {
        setLoginError(
          "Не удалось подключиться к серверу. Render мог «заснуть» — подождите ~30 секунд и попробуйте ещё раз.",
        );
      }
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
  };

  const handleAuthError = (err: unknown, fallbackMsg: string) => {
    if (err instanceof ApiError && err.status === 401) {
      setActionMsg("Сессия истекла — войдите заново.");
      handleLogout();
    } else {
      setActionMsg(fallbackMsg);
    }
  };

  const fetchReviews = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await fetchJson<ReviewItem[]>(`/api/reviews?status=${reviewFilter}`, token);
      setReviews(data);
    } catch (err) {
      handleAuthError(err, "Не удалось загрузить отзывы. Проверьте подключение к серверу.");
    } finally {
      setLoading(false);
    }
  };

  const fetchPublications = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await fetchJson<PublicationItem[]>(`/api/publications?status=${publicationFilter}`, token);
      setPublications(data);
    } catch (err) {
      handleAuthError(err, "Не удалось загрузить публикации. Проверьте подключение к серверу.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "reviews") fetchReviews();
    else fetchPublications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, activeTab, reviewFilter, publicationFilter]);

  const moderateReview = async (reviewId: string, action: "approve" | "reject") => {
    if (!token) return;
    try {
      await patchJson(`/api/reviews/${reviewId}?action=${action}`, token);
      setActionMsg(`Отзыв успешно ${action === "approve" ? "одобрен" : "отклонён"}.`);
      fetchReviews();
    } catch {
      setActionMsg("Не удалось обновить статус отзыва.");
    }
  };

  const moderatePublication = async (pubId: string, action: "publish" | "reject") => {
    if (!token) return;
    try {
      await patchJson(`/api/publications/${pubId}?action=${action}`, token);
      setActionMsg(`Публикация успешно ${action === "publish" ? "опубликована" : "отклонена"}.`);
      fetchPublications();
    } catch {
      setActionMsg("Не удалось обновить статус публикации.");
    }
  };

  if (!token) {
    return (
      <div>
        <PageHeader
          eyebrow="Администрирование"
          title="Вход в панель управления"
          lead="Авторизуйтесь для доступа к модерации отзывов и публикаций."
        />

        <section className="py-16">
          <Container>
            <div className="mx-auto max-w-md rounded-3xl border border-navy/10 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold text-navy">Авторизация</h3>

              {loginError && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm font-medium text-red-600">
                  ✕ {loginError}
                </div>
              )}

              <form onSubmit={handleLogin} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-navy/70">
                    Логин
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="admin"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-navy/15 bg-offwhite/50 px-4 py-2.5 text-sm text-navy focus:border-mint-dark focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-navy/70">
                    Пароль
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-navy/15 bg-offwhite/50 px-4 py-2.5 text-sm text-navy focus:border-mint-dark focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit" disabled={loggingIn} variant="primary" className="w-full">
                    {loggingIn ? "Вход..." : "Войти в панель"}
                  </Button>
                </div>
              </form>
            </div>
          </Container>
        </section>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        eyebrow="Администрирование"
        title="Панель управления"
        lead="Модерация отзывов и публикаций перед появлением на сайте."
      />

      <section className="py-16">
        <Container>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2 rounded-2xl bg-navy p-1.5">
              {(
                [
                  ["reviews", "Отзывы"],
                  ["publications", "Публикации"],
                ] as const
              ).map(([tab, label]) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setActionMsg("");
                  }}
                  className={`rounded-xl px-5 py-2 text-sm font-semibold transition-colors ${
                    activeTab === tab ? "bg-mint text-navy" : "text-offwhite/70 hover:text-offwhite"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <button
              onClick={handleLogout}
              className="text-sm font-semibold text-red-600 hover:text-red-700 underline"
            >
              Выйти из системы
            </button>
          </div>

          {actionMsg && (
            <div className="mb-6 rounded-xl border border-mint-dark/30 bg-mint/10 p-4 text-sm font-medium text-navy">
              {actionMsg}
            </div>
          )}

          {activeTab === "reviews" ? (
            <>
              <div className="mb-6 flex gap-2 rounded-2xl border border-navy/10 bg-offwhite p-1.5">
                {REVIEW_FILTERS.map((st) => (
                  <button
                    key={st}
                    onClick={() => setReviewFilter(st)}
                    className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                      reviewFilter === st ? "bg-navy text-white shadow-sm" : "text-navy/70 hover:text-navy"
                    }`}
                  >
                    {st === "pending" && "На модерации"}
                    {st === "approved" && "Одобренные"}
                    {st === "rejected" && "Отклонённые"}
                    {st === "all" && "Все"}
                  </button>
                ))}
              </div>

              {loading ? (
                <div className="py-12 text-center text-navy/60">Загрузка...</div>
              ) : reviews.length === 0 ? (
                <div className="rounded-2xl border border-navy/10 bg-white p-8 text-center text-navy/60">
                  Отзывов в этой категории не найдено.
                </div>
              ) : (
                <div className="grid gap-4">
                  {reviews.map((r) => (
                    <div
                      key={r.id}
                      className="flex flex-col justify-between gap-4 rounded-2xl border border-navy/10 bg-white p-6 shadow-sm sm:flex-row sm:items-center"
                    >
                      <div className="max-w-2xl space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-semibold uppercase tracking-wider text-mint-dark">
                            {r.role}
                          </span>
                          <span className="text-xs text-navy/40">• {r.date}</span>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                              r.status === "approved"
                                ? "bg-green-100 text-green-700"
                                : r.status === "rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {r.status === "approved" && "Одобрен"}
                            {r.status === "rejected" && "Отклонён"}
                            {r.status === "pending" && "Ожидает модерации"}
                          </span>
                        </div>

                        <p className="text-navy font-medium">«{r.text}»</p>
                        <p className="text-xs text-navy/60">Автор: {r.name}</p>
                      </div>

                      <div className="flex items-center gap-2 pt-2 sm:pt-0">
                        {r.status !== "approved" && (
                          <button
                            onClick={() => moderateReview(r.id, "approve")}
                            className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700"
                          >
                            Одобрить
                          </button>
                        )}
                        {r.status !== "rejected" && (
                          <button
                            onClick={() => moderateReview(r.id, "reject")}
                            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                          >
                            Отклонить
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="mb-6 flex gap-2 rounded-2xl border border-navy/10 bg-offwhite p-1.5">
                {PUBLICATION_FILTERS.map((st) => (
                  <button
                    key={st}
                    onClick={() => setPublicationFilter(st)}
                    className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                      publicationFilter === st ? "bg-navy text-white shadow-sm" : "text-navy/70 hover:text-navy"
                    }`}
                  >
                    {st === "draft" && "На модерации"}
                    {st === "published" && "Опубликованные"}
                    {st === "rejected" && "Отклонённые"}
                    {st === "all" && "Все"}
                  </button>
                ))}
              </div>

              {loading ? (
                <div className="py-12 text-center text-navy/60">Загрузка...</div>
              ) : publications.length === 0 ? (
                <div className="rounded-2xl border border-navy/10 bg-white p-8 text-center text-navy/60">
                  Публикаций в этой категории не найдено.
                </div>
              ) : (
                <div className="grid gap-4">
                  {publications.map((p) => (
                    <div
                      key={p.id}
                      className="flex flex-col justify-between gap-4 rounded-2xl border border-navy/10 bg-white p-6 shadow-sm sm:flex-row sm:items-center"
                    >
                      <div className="max-w-2xl space-y-2">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-xs font-semibold uppercase tracking-wider text-mint-dark">
                            {p.category}
                          </span>
                          <span className="text-xs text-navy/40">• {p.date}</span>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                              p.status === "published"
                                ? "bg-green-100 text-green-700"
                                : p.status === "rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {p.status === "published" && "Опубликована"}
                            {p.status === "rejected" && "Отклонена"}
                            {p.status === "draft" && "Ожидает модерации"}
                          </span>
                        </div>

                        <p className="text-navy font-bold">{p.title}</p>
                        <p className="text-sm text-navy/70">{p.excerpt}</p>
                        <p className="text-xs text-navy/60">
                          Автор: {p.author}
                          {p.content && (
                            <>
                              {" · "}
                              <a href={p.content} target="_blank" rel="noreferrer" className="underline">
                                открыть документ
                              </a>
                            </>
                          )}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 pt-2 sm:pt-0">
                        {p.status !== "published" && (
                          <button
                            onClick={() => moderatePublication(p.id, "publish")}
                            className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700"
                          >
                            Опубликовать
                          </button>
                        )}
                        {p.status !== "rejected" && (
                          <button
                            onClick={() => moderatePublication(p.id, "reject")}
                            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                          >
                            Отклонить
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </Container>
      </section>
    </div>
  );
}
