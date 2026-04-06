import { clinicData } from "@/lib/clinicData";

export default function FloatingContactBar() {
  const whatsappUrl = `https://wa.me/${clinicData.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(clinicData.whatsappMessage)}`;

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 px-4 md:hidden">
      <div className="mx-auto flex max-w-md items-center gap-3 rounded-[24px] border border-slate-200 bg-white/95 p-3 shadow-[0_16px_40px_rgba(15,23,42,0.16)] backdrop-blur">
        <a
          href={`tel:${clinicData.phone}`}
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-700"
        >
          Call Clinic
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl bg-sky-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-800"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
