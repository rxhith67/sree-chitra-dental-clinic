import Link from "next/link";
import { clinicData } from "@/lib/clinicData";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
          Trusted Dental Care in Neyyattinkara
        </p>
        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            {clinicData.name}
          </h1>
          <p className="text-lg leading-8 text-slate-600">
            {clinicData.tagline}
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
          >
            Book an Appointment
          </Link>
          <Link
            href="/services"
            className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-700 hover:text-teal-700"
          >
            View Services
          </Link>
        </div>
      </div>
    </section>
  );
}
