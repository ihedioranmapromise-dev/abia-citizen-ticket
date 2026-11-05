export default function Home() {
  return (
    <div className="space-y-10">
      <section className="card overflow-hidden">
        <div className="border-b border-slate-100 bg-gradient-to-br from-[#0b6b3a] to-[#0a5a32] px-6 py-10 text-white sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100/90">
            30-day pilot concept
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Report once. Keep a reference. Check status anytime.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-emerald-50/95 sm:text-base">
            A thin service layer for citizens and one focal desk: every report becomes a ticket with a clear
            state — received, in progress, or done. Built for visibility, not bureaucracy.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/report" className="btn-primary bg-white text-[#0b6b3a] hover:bg-emerald-50">
              Submit a report
            </a>
            <a href="/status" className="btn-secondary border-white/20 bg-white/10 text-white hover:bg-white/20">
              Check ticket status
            </a>
            <a href="/admin" className="btn-secondary border-white/20 bg-transparent text-white hover:bg-white/10">
              Open desk view
            </a>
          </div>
        </div>
        <div className="grid gap-6 px-6 py-8 sm:grid-cols-3 sm:px-10">
          {[
            {
              t: "1. Citizen reports",
              d: "Short form: issue type, location, description. Optional photo in production.",
            },
            {
              t: "2. Ticket ID issued",
              d: "Automatic reference (e.g. AB-2026-0042). Citizen keeps it — no more lost WhatsApp chats.",
            },
            {
              t: "3. Desk updates status",
              d: "One queue for officers. Status is visible to the citizen on demand.",
            },
          ].map((x) => (
            <div key={x.t}>
              <h3 className="text-sm font-semibold text-slate-900">{x.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-sm font-semibold text-slate-900">In scope for pilot</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>• One issue line (e.g. roads or environment)</li>
            <li>• One corridor or LGA</li>
            <li>• Public form + status check + desk list</li>
            <li>• Daily open-ticket visibility</li>
          </ul>
        </div>
        <div className="card p-6">
          <h2 className="text-sm font-semibold text-slate-900">Out of scope (phase 1)</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>• Statewide ERP or payment systems</li>
            <li>• Replacing call centres overnight</li>
            <li>• Hardware (fleet GPS, sensors)</li>
            <li>• Unauthenticated production at scale</li>
          </ul>
        </div>
      </section>

      <section className="card p-6 sm:p-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Try the demo path</h2>
        <ol className="mt-4 space-y-3 text-sm text-slate-700">
          <li>
            <span className="font-semibold text-slate-900">1.</span> Open{" "}
            <a className="font-medium text-[#0b6b3a] underline-offset-2 hover:underline" href="/report">
              Report
            </a>{" "}
            and submit a sample issue — you receive a ticket ID.
          </li>
          <li>
            <span className="font-semibold text-slate-900">2.</span> Paste that ID on{" "}
            <a className="font-medium text-[#0b6b3a] underline-offset-2 hover:underline" href="/status">
              Check status
            </a>
            .
          </li>
          <li>
            <span className="font-semibold text-slate-900">3.</span> On{" "}
            <a className="font-medium text-[#0b6b3a] underline-offset-2 hover:underline" href="/admin">
              Desk
            </a>
            , change status and add a short note — refresh status to see the update.
          </li>
        </ol>
        <p className="mt-6 text-xs text-slate-500">
          Sample tickets already loaded: <code className="rounded bg-slate-100 px-1.5 py-0.5">AB-2026-0001</code>,{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5">AB-2026-0002</code>,{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5">AB-2026-0003</code>
        </p>
      </section>
    </div>
  );
}
