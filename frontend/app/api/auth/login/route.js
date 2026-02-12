import { NextResponse } from "next/server";
import { API_BASE } from "@/lib/apiBase";

export async function POST(req) {
  try {
    const body = await req.json();
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    return NextResponse.json(
      { message: "Backend unavailable. Please start the API server." },
      { status: 502 }
    );
  }
}


