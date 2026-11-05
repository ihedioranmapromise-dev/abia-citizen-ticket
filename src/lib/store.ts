export type TicketStatus = "received" | "in_progress" | "done";

export type Ticket = {
  id: string;
  category: string;
  location: string;
  description: string;
  status: TicketStatus;
  note: string;
  createdAt: string;
  updatedAt: string;
};

const g = globalThis as unknown as { __abiaTickets?: Ticket[]; __abiaSeq?: number };

function ensure() {
  if (!g.__abiaTickets) {
    g.__abiaTickets = [
      {
        id: "AB-2026-0001",
        category: "Road defect",
        location: "Port Harcourt Road, Aba (near Ariaria)",
        description: "Deep pothole affecting traffic and drainage.",
        status: "in_progress",
        note: "Works team notified.",
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        updatedAt: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: "AB-2026-0002",
        category: "Waste / environment",
        location: "Faulks Road by Cemetery junction, Aba",
        description: "Refuse pile not evacuated for several days.",
        status: "received",
        note: "",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: "AB-2026-0003",
        category: "Streetlight",
        location: "Aguiyi Ironsi Boulevard, Umuahia",
        description: "Three consecutive poles dark after 7pm.",
        status: "done",
        note: "Repaired and verified.",
        createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ];
    g.__abiaSeq = 3;
  }
}

export function listTickets(): Ticket[] {
  ensure();
  return [...g.__abiaTickets!].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getTicket(id: string): Ticket | undefined {
  ensure();
  return g.__abiaTickets!.find((t) => t.id.toUpperCase() === id.toUpperCase().trim());
}

export function createTicket(input: {
  category: string;
  location: string;
  description: string;
}): Ticket {
  ensure();
  g.__abiaSeq = (g.__abiaSeq || 0) + 1;
  const id = `AB-2026-${String(g.__abiaSeq).padStart(4, "0")}`;
  const now = new Date().toISOString();
  const ticket: Ticket = {
    id,
    category: input.category,
    location: input.location,
    description: input.description,
    status: "received",
    note: "",
    createdAt: now,
    updatedAt: now,
  };
  g.__abiaTickets!.unshift(ticket);
  return ticket;
}

export function updateTicket(
  id: string,
  patch: { status?: TicketStatus; note?: string }
): Ticket | undefined {
  ensure();
  const t = g.__abiaTickets!.find((x) => x.id.toUpperCase() === id.toUpperCase());
  if (!t) return undefined;
  if (patch.status) t.status = patch.status;
  if (typeof patch.note === "string") t.note = patch.note;
  t.updatedAt = new Date().toISOString();
  return t;
}

export const CATEGORIES = [
  "Road defect",
  "Waste / environment",
  "Streetlight",
  "Drainage",
  "Public facility",
  "Other",
] as const;

export const STATUS_LABEL: Record<TicketStatus, string> = {
  received: "Received",
  in_progress: "In progress",
  done: "Done",
};
