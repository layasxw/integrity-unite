import { useState } from "react";
import { NavLink } from "react-router-dom";
import Container from "./ui/Container";
import Button from "./ui/Button";
import { primaryLinks, navGroups } from "../nav";
import { links } from "../data/mock";

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        `text-sm font-medium transition-colors ${
          isActive ? "text-mint" : "text-offwhite/70 hover:text-mint"
        }`
      }
    >
      {label}
    </NavLink>
  );
}

function DesktopGroup({ label, links: groupLinks }: { label: string; links: { label: string; to: string }[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        className="text-sm font-medium text-offwhite/70 transition-colors hover:text-mint"
        onClick={() => setOpen((v) => !v)}
      >
        {label} ▾
      </button>
      {open && (
        <div className="absolute left-0 top-full z-20 min-w-56 rounded-xl border border-offwhite/10 bg-navy p-2 shadow-xl">
          {groupLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive ? "bg-mint text-navy" : "text-offwhite/80 hover:bg-navy-light hover:text-mint"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-offwhite/10 bg-navy/95 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <NavLink to="/" className="text-lg font-extrabold text-offwhite">
          Integrity <span className="text-mint">Unite</span>
        </NavLink>

        <nav className="hidden items-center gap-6 lg:flex">
          {primaryLinks.map((link) => (
            <NavItem key={link.to} {...link} />
          ))}
          {navGroups.map((group) => (
            <DesktopGroup key={group.label} {...group} />
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <div className="h-6 w-px bg-offwhite/15" aria-hidden />
          <Button href={links.volunteerForm} variant="primary" className="px-5 py-2 text-sm">
            Стать волонтёром
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="text-offwhite lg:hidden"
          aria-label="Меню"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            {mobileOpen ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </Container>

      {mobileOpen && (
        <div className="max-h-[80svh] overflow-y-auto border-t border-offwhite/10 bg-navy lg:hidden">
          <Container className="flex flex-col gap-1 py-6">
            {primaryLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive ? "bg-mint text-navy" : "text-offwhite/80"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {navGroups.map((group) => (
              <div key={group.label} className="mt-4">
                <p className="px-3 text-xs font-semibold uppercase tracking-wide text-mint">
                  {group.label}
                </p>
                <div className="mt-1 flex flex-col gap-1">
                  {group.links.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `rounded-lg px-3 py-2 text-sm ${
                          isActive ? "bg-mint text-navy" : "text-offwhite/80"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}

            <Button href={links.volunteerForm} variant="primary" className="mt-4 w-full">
              Стать волонтёром
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
