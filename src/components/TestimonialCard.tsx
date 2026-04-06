type TestimonialCardProps = {
  name: string;
  quote: string;
};

export default function TestimonialCard({ name, quote }: TestimonialCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm leading-7 text-slate-600">
        &ldquo;{quote}&rdquo;
      </p>
      <p className="mt-4 text-sm font-semibold text-slate-900">{name}</p>
    </article>
  );
}
