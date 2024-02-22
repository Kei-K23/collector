export async function POST(req: Request) {
  const data = await req.json();
  return new Response("", { status: 200 });
}
