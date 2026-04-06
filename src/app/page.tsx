import type { Metadata } from "next";
import { clinicData } from "@/lib/clinicData";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Trusted dental care in Neyyattinkara, Kerala with modern, gentle treatment for families and individuals.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: clinicData.name,
    description:
      "Trusted dental care in Neyyattinkara, Kerala with modern, gentle treatment for families and individuals.",
    url: clinicData.siteUrl,
    images: ["/og-image.svg"],
  },
};

export default function HomePage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: clinicData.name,
    image: `${clinicData.siteUrl}/og-image.svg`,
    url: clinicData.siteUrl,
    telephone: clinicData.phone,
    email: clinicData.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Hospital Junction-Railway Station Rd, Vazhuthoor, Neyyattinkara",
      addressLocality: "Neyyattinkara",
      addressRegion: "Kerala",
      postalCode: "695121",
      addressCountry: "IN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:30",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "09:30",
        closes: "13:00",
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f9fcff_0%,#eef6ff_100%)]">
        <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top_right,rgba(14,116,206,0.16),transparent_38%)]" />
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:py-24">
          <div>
            <p className="inline-flex rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky-700 shadow-sm">
              {clinicData.location}
            </p>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Trusted dental care with a calm, modern clinic experience
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              {clinicData.name} provides gentle, patient-friendly dental care
              for individuals and families in Neyyattinkara, with a focus on
              comfort, clarity, and healthy long-term smiles.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-sky-700 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(14,116,206,0.22)] transition hover:bg-sky-800"
              >
                Book Appointment
              </a>
              <a
                href={`tel:${clinicData.phone}`}
                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-700"
              >
                Call Now
              </a>
            </div>
          </div>

          <div className="rounded-[28px] border border-sky-100 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-8">
            <div className="rounded-[24px] bg-[linear-gradient(180deg,#f6fbff_0%,#edf5fd_100%)] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                Why Patients Choose Us
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-2xl font-semibold text-slate-900">6+</p>
                  <p className="mt-1 text-sm text-slate-600">Core dental services</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-2xl font-semibold text-slate-900">Tue-Sun</p>
                  <p className="mt-1 text-sm text-slate-600">Convenient clinic hours</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm sm:col-span-2">
                  <p className="text-sm font-medium text-slate-900">
                    Clean, reassuring care for families, children, and adults.
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    Thoughtful consultations, modern treatment methods, and a
                    welcoming environment from the first visit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
            Our Services
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Comprehensive care for a healthier, brighter smile
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {clinicData.services.map((service) => (
            <div
              key={service.title}
              className="rounded-[24px] border border-slate-200 bg-white p-7 shadow-[0_18px_45px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:border-sky-200"
            >
              <div className="inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                Care
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-900">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
            Meet Our Team
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Skilled care delivered with warmth and clarity
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {clinicData.team.map((member) => (
            <div
              key={member.name}
              className="rounded-[24px] border border-slate-200 bg-white p-7 shadow-[0_18px_45px_rgba(15,23,42,0.05)]"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-lg font-semibold text-sky-700">
                  {member.name.split(" ").at(1)?.charAt(0) ?? member.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-slate-900">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium uppercase tracking-[0.12em] text-sky-700">
                    {member.role}
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-slate-600">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#f8fbff_0%,#f2f7fc_100%)]">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
              Google Reviews
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Trusted by patients and families in Neyyattinkara
            </h2>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-600">
              <div className="inline-flex items-center gap-3 rounded-full border border-sky-100 bg-white px-4 py-2 shadow-sm">
                <span className="text-base font-semibold text-slate-900">5.0</span>
                <span className="tracking-[0.2em] text-amber-400">*****</span>
              </div>
              <p>Based on publicly shared reviews and testimonials found online.</p>
            </div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {clinicData.testimonials.map((item) => (
              <div
                key={item.name}
                className="rounded-[24px] border border-slate-200 bg-white p-7 shadow-[0_18px_45px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:border-sky-200"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-900">
                    {item.name}
                  </p>
                  <span className="text-sm tracking-[0.18em] text-amber-400">
                    *****
                  </span>
                </div>
                <div className="mt-4 text-3xl leading-none text-sky-100">&ldquo;</div>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.quote}</p>
                <p className="mt-5 text-xs font-medium uppercase tracking-[0.16em] text-sky-700">
                  Google Review
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
