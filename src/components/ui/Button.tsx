import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant = "primary" | "secondary" | "outline";

const variantClasses: Record<Variant, string> = {
  primary: "bg-mint text-navy hover:bg-mint/80",
  secondary: "bg-yellow text-navy hover:bg-yellow/80",
  outline: "border-2 border-offwhite/40 text-offwhite hover:border-mint hover:text-mint",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition-colors disabled:opacity-50 ${variantClasses[variant]} ${className}`;

  if (!href) {
    return (
      <button type={type} onClick={onClick} disabled={disabled} className={classes}>
        {children}
      </button>
    );
  }

  const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

  if (external) {
    const isSpecialProtocol = href.startsWith("mailto:") || href.startsWith("tel:");
    return (
      <a
        href={href}
        target={isSpecialProtocol ? undefined : "_blank"}
        rel={isSpecialProtocol ? undefined : "noopener noreferrer"}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={href} className={classes}>
      {children}
    </Link>
  );
}

