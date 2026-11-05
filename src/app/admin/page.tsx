"use client";

import { useCallback, useEffect, useState } from "react";
import { STATUS_LABEL, type Ticket, type TicketStatus } from "@/lib/store";

function statusStyle(s: TicketStatus) {
  if (s === "done") return "bg-emerald-50 text-emerald-800";
  if (s === "in_progress") return "bg-amber-50 text-amber-900";
  return "bg-slate-100 text-slate-700";
}

export default function AdminPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/tickets");
    const data = await res.json();
    setTickets(data.tickets || []);
    const n: Record<string, string> = {};
    (data.tickets || []).forEach((t: Ticket) => {
      n[t.id] = t.note || "";
    });
    setNotes(n);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function save(id: string, status: TicketStatus) {
    setSaving(id);
    await fetch("/api/tickets", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status, note: notes[id] ?? "" }),
    });
    await load();
    setSaving(null);
  }

  const open = tickets.filter((t) => t.status !== "done").length;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Desk queue</h1>
          <p className="mt-2 text-sm text-slate-600">
            Focal officer view — update status and leave a short note citizens can see.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm">
            <span className="text-slate-500">Open</span>{" "}
            <span className="font-semibold text-slate-900">{open}</span>
            <span className="mx-2 text-slate-300">|</span>
            <span className="text-slate-500">Total</span>{" "}
            <span className="font-semibold text-slate-900">{tickets.length}</span>
          </div>
          <button type="button" className="btn-secondary" onClick={load}>
            Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">Loading queue…</p>
      ) : (
        <div className="space-y-4">
          {tickets.map((t) => (
            <div key={t.id} className="card p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-sm font-semibold text-slate-900">{t.id}</p>
                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {t.category} · {t.location}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">{t.description}</p>
                  <p className="mt-2 text-xs text-slate-400">
                    {new Date(t.createdAt).toLocaleString()} · updated {new Date(t.updatedAt).toLocaleString()}
                  </p>
                </div>
                <span className={`badge ${statusStyle(t.status)}`}>{STATUS_LABEL[t.status]}</span>
              </div>
              <div className="mt-4 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-[1fr_auto]">
                <input
                  className="input"
                  placeholder="Desk note (visible on status page)"
                  value={notes[t.id] ?? ""}
                  onChange={(e) => setNotes((prev) => ({ ...prev, [t.id]: e.target.value }))}
                />
                <div className="flex flex-wrap gap-2">
                  {(["received", "in_progress", "done"] as TicketStatus[]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
                        t.status === s
                          ? "bg-[#0b6b3a] text-white"
                          : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      }`}
                      disabled={saving === t.id}
                      onClick={() => save(t.id, s)}
                    >
                      {STATUS_LABEL[s]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <p className="mt-6 text-xs text-slate-500">
        Demo desk is open (no login). Production requires authenticated officers and audit log.
      </p>
    </div>
  );
}
