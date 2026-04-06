import { clinicData } from "@/lib/clinicData";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#f1f7fd_100%)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-slate-900">
            {clinicData.name}
          </h3>
          <p className="mt-3 max-w-xs text-sm leading-7 text-slate-600">
            {clinicData.tagline}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-800">
            Contact
          </h4>
          <p className="mt-3 text-sm text-slate-600">{clinicData.address}</p>
          <p className="text-sm text-slate-600">{clinicData.phone}</p>
          <p className="text-sm text-slate-600">{clinicData.email}</p>
          <a
            href={`https://wa.me/${clinicData.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(clinicData.whatsappMessage)}`}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex text-sm font-medium text-sky-700 transition hover:text-sky-800"
          >
            Message on WhatsApp
          </a>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-800">
            Hours
          </h4>
          {clinicData.hours.map((item) => (
            <p key={item} className="mt-2 text-sm text-slate-600">
              {item}
            </p>
          ))}
        </div>
      </div>
    </footer>
  );
}
