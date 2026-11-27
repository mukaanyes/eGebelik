// Liveness probe for Docker healthcheck and uptime monitoring. No data access.
export function GET() {
  return Response.json({ status: "ok" });
}
