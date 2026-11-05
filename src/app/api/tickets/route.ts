import { NextRequest, NextResponse } from "next/server";
import { createTicket, listTickets, updateTicket } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ tickets: listTickets() });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body?.category || !body?.location || !body?.description) {
    return NextResponse.json({ error: "category, location and description are required" }, { status: 400 });
  }
  if (String(body.description).trim().length < 10) {
    return NextResponse.json({ error: "Please provide a clearer description (min 10 characters)" }, { status: 400 });
  }
  const ticket = createTicket({
    category: String(body.category).trim(),
    location: String(body.location).trim(),
    description: String(body.description).trim(),
  });
  return NextResponse.json({ ticket }, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body?.id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }
  const ticket = updateTicket(String(body.id), {
    status: body.status,
    note: body.note,
  });
  if (!ticket) return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  return NextResponse.json({ ticket });
}
