"use client";

import { useState } from "react";
import { CATEGORIES } from "@/lib/store";

type Category = (typeof CATEGORIES)[number];

export default function ReportPage() {
  const [category, setCategory] = useState<Category>(CATEGORIES[0]);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ticketId, setTicketId] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, location, description }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not create ticket");
      setTicketId(data.ticket.id);
      setLocation("");
      setDescription("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (ticketId) {
    return (
      <div className="mx-auto max-w-lg">
        <div className="card p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-[#0b6b3a]">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="mt-4 text-xl font-semibold text-slate-900">Report received</h1>
          <p className="mt-2 text-sm text-slate-600">Keep this reference. You can check status anytime.</p>
          <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800/70">Ticket ID</p>
            <p className="mt-1 font-mono text-2xl font-semibold tracking-wide text-[#0b6b3a]">{ticketId}</p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a href={`/status?id=${encodeURIComponent(ticketId)}`} className="btn-primary">
              Check status
            </a>
            <button type="button" className="btn-secondary" onClick={() => setTicketId("")}>
              Submit another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Submit a report</h1>
        <p className="mt-2 text-sm text-slate-600">
          You will receive a ticket ID immediately. Use it to track progress.
        </p>
      </div>
      <form onSubmit={onSubmit} className="card space-y-5 p-6 sm:p-8">
        <div>
          <label className="label" htmlFor="category">
            Issue type
          </label>
          <select
            id="category"
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="location">
            Location
          </label>
          <input
            id="location"
            className="input"
            placeholder="Street, landmark, LGA"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="label" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            className="input min-h-[120px] resize-y"
            placeholder="What is wrong? When did you notice it?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            minLength={10}
          />
        </div>
        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? "Submitting…" : "Submit report"}
        </button>
      </form>
    </div>
  );
}
