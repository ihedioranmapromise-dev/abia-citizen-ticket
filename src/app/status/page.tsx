"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { STATUS_LABEL, type Ticket, type TicketStatus } from "@/lib/store";

function statusStyle(s: TicketStatus) {
  if (s === "done") return "bg-emerald-50 text-emerald-800";
  if (s === "in_progress") return "bg-amber-50 text-amber-900";
  return "bg-slate-100 text-slate-700";
}

function StatusInner() {
  const params = useSearchParams();
  const [id, setId] = useState(params.get("id") || "");
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function lookup(ticketId: string) {
    if (!ticketId.trim()) return;
    setLoading(true);
    setError("");
    setTicket(null);
    try {
      const res = await fetch(`/api/tickets/${encodeURIComponent(ticketId.trim())}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Not found");
      setTicket(data.ticket);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load ticket");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const q = params.get("id");
    if (q) {
      setId(q);
      lookup(q);
    }
  }, [params]);

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Check status</h1>
        <p className="mt-2 text-sm text-slate-600">Enter the ticket ID you received when you reported.</p>
      </div>
      <form
        className="card flex flex-col gap-3 p-6 sm:flex-row sm:items-end"
        onSubmit={(e) => {
          e.preventDefault();
          lookup(id);
        }}
      >
        <div className="flex-1">
          <label className="label" htmlFor="tid">
            Ticket ID
          </label>
          <input
            id="tid"
            className="input font-mono"
            placeholder="AB-2026-0001"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Looking up…" : "Look up"}
        </button>
      </form>

      {error && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      {ticket && (
        <div className="card mt-6 overflow-hidden">
          <div className="border-b border-slate-100 px-6 py-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-lg font-semibold text-slate-900">{ticket.id}</p>
              <span className={`badge ${statusStyle(ticket.status)}`}>{STATUS_LABEL[ticket.status]}</span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Opened {new Date(ticket.createdAt).toLocaleString()} · Updated{" "}
              {new Date(ticket.updatedAt).toLocaleString()}
            </p>
          </div>
          <div className="space-y-4 px-6 py-5 text-sm">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Category</p>
              <p className="mt-1 text-slate-900">{ticket.category}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Location</p>
              <p className="mt-1 text-slate-900">{ticket.location}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Description</p>
              <p className="mt-1 text-slate-700">{ticket.description}</p>
            </div>
            {ticket.note && (
              <div className="rounded-xl bg-slate-50 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Desk note</p>
                <p className="mt-1 text-slate-700">{ticket.note}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function StatusPage() {
  return (
    <Suspense fallback={<div className="text-sm text-slate-500">Loading…</div>}>
      <StatusInner />
    </Suspense>
  );
}
