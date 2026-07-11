export default function SectionTitle({
  eyebrow,
  title,
  description,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow && (
        <span
          className={`inline-block rounded-full px-3 py-1 text-sm font-semibold tracking-wide uppercase ${
            light ? "bg-offwhite/10 text-mint" : "bg-mint/20 text-navy"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl ${
          light ? "text-offwhite" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-lg leading-relaxed ${light ? "text-offwhite/80" : "text-navy/70"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
