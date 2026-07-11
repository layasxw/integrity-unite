import Container from "./ui/Container";

export default function PageHeader({ eyebrow, title, lead }: { eyebrow?: string; title: string; lead?: string }) {
  return (
    <div className="relative overflow-hidden bg-navy">
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-mint/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-yellow/10 blur-3xl"
        aria-hidden
      />

      <Container className="relative py-20">
        {eyebrow && (
          <span className="inline-block rounded-full bg-offwhite/10 px-4 py-1 text-sm font-semibold text-mint">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 max-w-2xl text-3xl font-extrabold tracking-tight text-offwhite sm:text-4xl">
          {title}
        </h1>
        {lead && <p className="mt-4 max-w-2xl text-lg text-offwhite/80">{lead}</p>}
      </Container>
    </div>
  );
}
