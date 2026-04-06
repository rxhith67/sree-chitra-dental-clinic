import Link from "next/link";
import { clinicData } from "@/lib/clinicData";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-sky-100/80 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/" className="text-lg font-semibold tracking-tight text-sky-800">
            {clinicData.name}
          </Link>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
            Gentle and Modern Dental Care
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-sm font-medium text-slate-600">
          <Link
            href="/"
            className="rounded-full px-4 py-2 transition hover:bg-sky-50 hover:text-sky-700"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="rounded-full px-4 py-2 transition hover:bg-sky-50 hover:text-sky-700"
          >
            About
          </Link>
          <Link
            href="/services"
            className="rounded-full px-4 py-2 transition hover:bg-sky-50 hover:text-sky-700"
          >
            Services
          </Link>
          <Link
            href="/contact"
            className="rounded-full bg-sky-700 px-4 py-2 text-white transition hover:bg-sky-800"
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
