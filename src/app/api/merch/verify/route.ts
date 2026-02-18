import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const correctPassword = process.env.MERCH_PASSWORD;

    if (!correctPassword) {
      return NextResponse.json(
        { ok: false, error: "Protección no configurada" },
        { status: 503 }
      );
    }

    if (password === correctPassword) {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: false }, { status: 401 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
