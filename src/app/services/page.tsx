import type { Metadata } from "next";
import { clinicData } from "@/lib/clinicData";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore the dental treatments available at Sree Chitra Dental Clinic in Neyyattinkara, Kerala.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: `Services | ${clinicData.name}`,
    description:
      "Explore the dental treatments available at Sree Chitra Dental Clinic in Neyyattinkara, Kerala.",
    url: `${clinicData.siteUrl}/services`,
    images: ["/og-image.svg"],
  },
};

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
        Services
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
        Modern dental treatments tailored to everyday needs
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
        We offer a range of dental treatments designed to support long-term
        oral health, comfort, and confidence.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clinicData.services.map((service) => (
          <div
            key={service.title}
            className="rounded-[24px] border border-slate-200 bg-white p-7 shadow-[0_18px_45px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:border-sky-200"
          >
            <div className="inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
              Treatment
            </div>
            <h2 className="mt-5 text-xl font-semibold tracking-tight text-slate-900">
              {service.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
