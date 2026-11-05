import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Abia Citizen Request — Pilot Demo",
  description:
    "Pilot: report an issue, receive a ticket ID, check status. Built for Abia State service delivery.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen antialiased`}>
        <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <a href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0b6b3a] text-sm font-bold text-white shadow-sm">
                AB
              </div>
              <div>
                <div className="text-sm font-semibold tracking-tight text-slate-900">
                  Abia Citizen Request
                </div>
                <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
                  Pilot · Service delivery
                </div>
              </div>
            </a>
            <nav className="flex items-center gap-1 text-sm font-medium text-slate-600">
              <a href="/report" className="rounded-lg px-3 py-2 hover:bg-slate-50 hover:text-slate-900">
                Report
              </a>
              <a href="/status" className="rounded-lg px-3 py-2 hover:bg-slate-50 hover:text-slate-900">
                Check status
              </a>
              <a href="/admin" className="rounded-lg px-3 py-2 hover:bg-slate-50 hover:text-slate-900">
                Desk
              </a>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">{children}</main>
        <footer className="border-t border-slate-200/80 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-6 text-xs text-slate-500 sm:px-6">
            <p className="font-medium text-slate-600">Demonstration pilot — not an official Abia State portal.</p>
            <p className="mt-1">
              Shows the product pattern: ticket ID → status → desk queue. Production would run under state ownership
              with authenticated officers and official domain.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
