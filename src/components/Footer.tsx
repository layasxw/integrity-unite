import { Link } from "react-router-dom";
import Container from "./ui/Container";
import { primaryLinks } from "../nav";
import { links } from "../data/mock";

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

        <div className="mt-12 border-t border-offwhite/10 pt-6 text-xs">
          © {new Date().getFullYear()} Integrity Unite. Проект работает с 30.01.2024.
        </div>
      </Container>
    </footer>
  );
}
