import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Эндпоинт проверки состояния для хостинга (Timeweb healthcheck).
 * Всегда отвечает 200 OK, пока приложение живо.
 */
export function GET() {
  return NextResponse.json(
    { status: "ok", uptime: process.uptime(), timestamp: new Date().toISOString() },
    { status: 200, headers: { "Cache-Control": "no-store" } },
  );
}

export function HEAD() {
  return new Response(null, { status: 200, headers: { "Cache-Control": "no-store" } });
}
