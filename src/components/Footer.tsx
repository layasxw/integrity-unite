import { Link } from "react-router-dom";
import Container from "./ui/Container";
import { primaryLinks } from "../nav";
import { links, partners, type Partner } from "../data/mock";

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
            <div className="font-semibold text-offwhite">Контакты</div>
            <a href={`mailto:${links.contactEmail}`} className="mt-2 inline-block hover:text-mint">
              {links.contactEmail}
            </a>
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
