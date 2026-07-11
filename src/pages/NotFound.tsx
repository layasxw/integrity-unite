import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="text-6xl font-extrabold text-navy">404</p>
      <p className="mt-3 text-navy/70">Такой страницы не существует.</p>
      <Link to="/" className="mt-6 inline-block rounded-full bg-navy px-6 py-3 font-semibold text-offwhite">
        На главную
      </Link>
    </div>
  );
}
