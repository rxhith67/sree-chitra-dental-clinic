import type { Metadata } from "next";
import BookingForm from "@/components/BookingForm";
import { clinicData } from "@/lib/clinicData";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a dental appointment or contact Sree Chitra Dental Clinic in Neyyattinkara, Kerala.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `Contact | ${clinicData.name}`,
    description:
      "Book a dental appointment or contact Sree Chitra Dental Clinic in Neyyattinkara, Kerala.",
    url: `${clinicData.siteUrl}/contact`,
    images: ["/og-image.svg"],
  },
};

export default function ContactPage() {
  const mapsEmbedUrl =
    "https://www.google.com/maps?q=Hospital%20Junction-Railway%20Station%20Rd%2C%20Vazhuthoor%2C%20Neyyattinkara%2C%20Kerala%20695121%2C%20India&z=16&output=embed";
  const directionsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=Hospital%20Junction-Railway%20Station%20Rd%2C%20Vazhuthoor%2C%20Neyyattinkara%2C%20Kerala%20695121%2C%20India";

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
        Contact
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
        Book a visit or reach out to our clinic
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
        Submit an appointment request and our clinic will contact you to confirm
        the booking.
      </p>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <div className="rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,#f9fcff_0%,#f1f7fd_100%)] p-7 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Clinic Details
          </h2>
          <div className="mt-6 space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">
                Address
              </p>
              <p className="mt-2 text-slate-600">{clinicData.address}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">
                Phone
              </p>
              <p className="mt-2 text-slate-600">{clinicData.phone}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">
                Email
              </p>
              <p className="mt-2 text-slate-600">{clinicData.email}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">
                WhatsApp
              </p>
              <p className="mt-2 text-slate-600">{clinicData.whatsapp}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={`mailto:${clinicData.email}`}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-700"
            >
              Email Clinic
            </a>
            <a
              href={`https://wa.me/${clinicData.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(clinicData.whatsappMessage)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl bg-sky-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-800"
            >
              WhatsApp Us
            </a>
          </div>
        </div>

        <BookingForm />
      </div>

      <section className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
          <div className="border-b border-slate-100 px-7 py-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
              Find Us
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
              Visit the clinic easily
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Use the map below to locate Sree Chitra Dental Clinic and get
              directions from your current location.
            </p>
          </div>
          <div className="aspect-[16/10] w-full">
            <iframe
              title="Sree Chitra Dental Clinic Map"
              src={mapsEmbedUrl}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-7 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
            Directions
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
            Plan your visit
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            We are located on Hospital Junction-Railway Station Road in
            Vazhuthoor, Neyyattinkara. You can call ahead or message the clinic
            if you need help locating the building.
          </p>

          <div className="mt-6 rounded-2xl bg-sky-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">
              Clinic Address
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              {clinicData.address}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl bg-sky-700 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-sky-800"
            >
              Get Directions
            </a>
            <a
              href={`tel:${clinicData.phone}`}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-700"
            >
              Call Before Visiting
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
