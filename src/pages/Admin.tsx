import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import { API_URL } from "../lib/api";

interface ReviewItem {
  id: string;
  name: string;
  role: string;
  text: string;
  status: "pending" | "approved" | "rejected";
  date: string;
}

export default function Admin() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("adminToken"));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "rejected">("pending");
  const [actionMsg, setActionMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");

    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("adminToken", data.access_token);
        setToken(data.access_token);
        setUsername("");
        setPassword("");
      } else {
        setLoginError("Неверный логин или пароль");
      }
    } catch {
      setLoginError("Не удалось подключиться к серверу");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
  };

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const url =
        filterStatus === "all"
          ? `${API_URL}/api/reviews?status=all`
          : `${API_URL}/api/reviews?status=${filterStatus}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch {
      setActionMsg("Ошибка при загрузке отзывов.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchReviews();
    }
  }, [token, filterStatus]);

  const handleModerate = async (reviewId: string, action: "approve" | "reject") => {
    try {
      const res = await fetch(`${API_URL}/api/reviews/${reviewId}?action=${action}`, {
        method: "PATCH",
      });

      if (res.ok) {
        setActionMsg(`Отзыв успешно ${action === "approve" ? "одобрен" : "отклонён"}.`);
        fetchReviews();
      } else {
        setActionMsg("Не удалось обновить статус отзыва.");
      }
    } catch {
      setActionMsg("Ошибка сети.");
    }
  };

  if (!token) {
    return (
      <div>
        <PageHeader
          eyebrow="Администрирование"
          title="Вход в панель управления"
          lead="Авторизуйтесь для доступа к модерации отзывов и управления контентом."
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
        title="Модерация отзывов"
        lead="Управление поступившими отзывами: одобрение для публикации на сайте или отклонение."
      />

      <section className="py-16">
        <Container>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2 rounded-2xl bg-offwhite p-1.5 border border-navy/10">
              {(["pending", "approved", "rejected", "all"] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                    filterStatus === st
                      ? "bg-navy text-white shadow-sm"
                      : "text-navy/70 hover:text-navy"
                  }`}
                >
                  {st === "pending" && "На модерации"}
                  {st === "approved" && "Одобренные"}
                  {st === "rejected" && "Отклонённые"}
                  {st === "all" && "Все"}
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

          {loading ? (
            <div className="py-12 text-center text-navy/60">Загрузка отзывов из базы данных...</div>
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
                  <div className="space-y-2 max-w-2xl">
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
                        onClick={() => handleModerate(r.id, "approve")}
                        className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 transition-colors"
                      >
                        Одобрить
                      </button>
                    )}
                    {r.status !== "rejected" && (
                      <button
                        onClick={() => handleModerate(r.id, "reject")}
                        className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
                      >
                        Отклонить
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
