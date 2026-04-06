type TeamCardProps = {
  name: string;
  role: string;
  bio: string;
};

export default function TeamCard({ name, role, bio }: TeamCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 text-lg font-bold text-teal-700">
        {name.charAt(0)}
      </div>
      <h3 className="mt-4 text-xl font-semibold text-slate-900">{name}</h3>
      <p className="text-sm font-medium text-teal-700">{role}</p>
      <p className="mt-3 text-sm leading-7 text-slate-600">{bio}</p>
    </article>
  );
}
