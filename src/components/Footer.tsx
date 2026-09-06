import { Link } from "react-router-dom";
import Container from "./ui/Container";
import { primaryLinks } from "../nav";
import { partners, type Partner } from "../data/mock";

// У логотипов партнёров фон «вшит» в картинку (серый, белый, тёмный),
// поэтому каждый кладём в одинаковую полупрозрачную рамку — так разнородные
// логотипы читаются одним рядом, а не набором случайных квадратов.
const tileClass =
  "flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl bg-offwhite/[0.06] p-2 " +
  "ring-1 ring-inset ring-offwhite/10 transition duration-200 sm:h-20 sm:w-20";

function PartnerLogo({ partner }: { partner: Partner }) {
  const logo = (
    <img
      src={partner.logo}
      alt={partner.name}
      loading="lazy"
      width={64}
      height={64}
      className="h-full w-full rounded-xl object-cover"
    />
  );

  return partner.url ? (
    <a
      href={partner.url}
      target="_blank"
      rel="noreferrer"
      title={partner.name}
      className={`${tileClass} hover:-translate-y-0.5 hover:bg-offwhite/10 hover:ring-mint/40`}
    >
      {logo}
    </a>
  ) : (
    <div className={tileClass} title={partner.name}>
      {logo}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="mt-auto bg-navy py-16 text-offwhite/60">
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="text-lg font-extrabold text-offwhite">
              Integrity <span className="text-mint">Unite</span>
            </div>
            <p className="mt-3 max-w-sm text-sm">
              Некоммерческая волонтёрская организация. Бесплатное образование для детей
              из малоимущих и многодетных семей.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            {primaryLinks.map((link) => (
              <Link key={link.to} to={link.to} className="hover:text-mint">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="text-sm">
            <div className="font-semibold text-offwhite">Контакты основателей</div>
            <div className="mt-4 flex flex-col gap-4">
              <div className="rounded-xl border border-offwhite/10 bg-offwhite/[0.03] p-3">
                <p className="font-medium text-offwhite">Диана <span className="text-xs text-mint">(Основательница)</span></p>
                <div className="mt-1.5 flex flex-col gap-1 text-xs">
                  <a href="tel:+77058745226" className="flex items-center gap-1.5 text-offwhite/80 hover:text-mint transition-colors">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    +7 705 874 52 26
                  </a>
                  <a href="mailto:diannnaew@gmail.com" className="flex items-center gap-1.5 text-offwhite/80 hover:text-mint transition-colors">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    diannnaew@gmail.com
                  </a>
                </div>
              </div>

              <div className="rounded-xl border border-offwhite/10 bg-offwhite/[0.03] p-3">
                <p className="font-medium text-offwhite">Полина <span className="text-xs text-mint">(Соосновательница)</span></p>
                <div className="mt-1.5 flex flex-col gap-1 text-xs">
                  <a href="tel:+375336311514" className="flex items-center gap-1.5 text-offwhite/80 hover:text-mint transition-colors">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    +375 33 631 15 14
                  </a>
                  <a href="mailto:hanchina.polina@gmail.com" className="flex items-center gap-1.5 text-offwhite/80 hover:text-mint transition-colors">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    hanchina.polina@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {partners.length > 0 && (
          <div className="mt-12 border-t border-offwhite/10 pt-10">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-mint">
              Партнёры
            </p>
            <ul className="mt-5 flex flex-wrap items-center gap-3">
              {partners.map((partner) => (
                <li key={partner.id}>
                  <PartnerLogo partner={partner} />
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-12 flex items-center justify-between border-t border-offwhite/10 pt-6 text-xs">
          <span>© {new Date().getFullYear()} Integrity Unite. Проект работает с 30.01.2024.</span>
          <Link to="/admin" className="hover:text-mint transition-colors">
            Панель администратора
          </Link>
        </div>

      </Container>
    </footer>
  );
}
