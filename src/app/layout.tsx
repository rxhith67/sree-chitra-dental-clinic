import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContactBar from "@/components/FloatingContactBar";
import { clinicData } from "@/lib/clinicData";

export const metadata: Metadata = {
  metadataBase: new URL(clinicData.siteUrl),
  title: {
    default: clinicData.name,
    template: `%s | ${clinicData.name}`,
  },
  description:
    "Modern and gentle dental care in Neyyattinkara, Kerala for families and individuals.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: clinicData.name,
    description:
      "Modern and gentle dental care in Neyyattinkara, Kerala for families and individuals.",
    url: clinicData.siteUrl,
    siteName: clinicData.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: clinicData.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clinicData.name,
    description:
      "Modern and gentle dental care in Neyyattinkara, Kerala for families and individuals.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900">
        <Navbar />
        {children}
        <Footer />
        <FloatingContactBar />
      </body>
    </html>
  );
}
