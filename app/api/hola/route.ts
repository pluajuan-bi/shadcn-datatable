export async function GET() {
  try {
    // Internal service address inside the OpenShift cluster
    const backendUrl = "http://service-shadcn-data-table-clone.pluaj-dev-dev.svc.cluster.local:8082/";
    const res = await fetch(backendUrl, { cache: "no-store" });
    const text = await res.text();

    return new Response(text, {
      status: res.status,
      headers: {
        "Content-Type": res.headers.get("content-type") || "text/plain; charset=utf-8",
      },
    });
  } catch (err) {
    const msg = `Error proxying to backend: ${String(err)}`;
    return new Response(msg, { status: 502, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  }
}
