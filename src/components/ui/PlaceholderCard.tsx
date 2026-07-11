export default function PlaceholderCard({ tag }: { tag: string }) {
  return (
    <div className="rounded-2xl border border-navy/10 bg-white p-6">
      <span className="inline-block rounded-full bg-navy/5 px-3 py-1 text-xs font-semibold text-navy/60">
        {tag}
      </span>
      <div className="mt-4 h-3 w-4/5 rounded bg-navy/10" />
      <div className="mt-2 h-3 w-3/5 rounded bg-navy/10" />
      <div className="mt-6 h-24 rounded-xl bg-navy/5" />
    </div>
  );
}
