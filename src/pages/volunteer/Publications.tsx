import PageHeader from "../../components/PageHeader";
import Container from "../../components/ui/Container";
import { publications, links } from "../../data/mock";

const benefits = [
  "Портфолио для вузов и работы",
  "Официальная публикация — весомый пункт в резюме",
  "Обмен опытом: твои идеи могут вдохновить других волонтёров по всему миру",
  "Развитие навыков письма — редакторская поддержка помогает улучшить текст",
  "Признание в сообществе как эксперта в нашей сети",
  "Практическое применение: исследования могут повлиять на проекты Integrity Unite",
];

export default function Publications() {
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

          <h2 className="mt-16 text-2xl font-extrabold tracking-tight text-navy">Как подать работу</h2>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-navy/80">
            <li>
              Заполни{" "}
              <a href={links.publicationForm} target="_blank" rel="noreferrer" className="underline">
                форму
              </a>
            </li>
            <li>Дождись ответа от команды (до 7 дней)</li>
          </ol>
          <p className="mt-3 max-w-2xl text-navy/80">
            После публикации работа появится на сайте, а ты получишь сертификат о
            публикации, который можно указать в портфолио для поступления.
          </p>

          <h2 className="mt-16 text-2xl font-extrabold tracking-tight text-navy">Опубликованные работы</h2>
          <div className="mt-6 space-y-4">
            {publications.map((pub) => (
              <div key={pub.id} className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-mint-dark">
                  {pub.category}
                </p>
                <p className="mt-1 text-lg font-bold text-navy">{pub.title}</p>
                <p className="mt-2 text-sm text-navy/70">{pub.excerpt}</p>
                <p className="mt-3 text-xs text-navy/50">
                  {pub.author} · {new Date(pub.date).toLocaleDateString("ru-RU")}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
