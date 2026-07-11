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
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition-colors ${variantClasses[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
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
