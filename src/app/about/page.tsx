import type { Metadata } from "next";
import { clinicData } from "@/lib/clinicData";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the care philosophy and patient-first approach at Sree Chitra Dental Clinic.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About ${clinicData.name}`,
    description:
      "Learn about the care philosophy and patient-first approach at Sree Chitra Dental Clinic.",
    url: `${clinicData.siteUrl}/about`,
    images: ["/og-image.svg"],
  },
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
        About
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
        Thoughtful care built around patient comfort
      </h1>
      <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600">
        {clinicData.name} is committed to providing quality dental care in a
        calm, hygienic, and patient-friendly environment. We focus on comfort,
        clear communication, and modern treatment approaches for patients of
        all ages.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="rounded-[24px] border border-slate-200 bg-white p-7 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
          <div className="inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
            Mission
          </div>
          <h2 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900">
            Our Mission
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            To help every patient maintain a healthy smile through preventive,
            restorative, and compassionate dental care.
          </p>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#f1f7fd_100%)] p-7 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
          <div className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
            Value
          </div>
          <h2 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900">
            Why Choose Us
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            We combine professional expertise, modern equipment, and a gentle
            treatment approach to make every visit comfortable and effective.
          </p>
        </div>
      </div>
    </main>
  );
}
