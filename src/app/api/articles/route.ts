import { NextResponse } from "next/server";
import qs from "qs";

export async function GET() {
  const query = qs.stringify(
    {
      status: "published",
      populate: { Hero: { populate: "*" } },
      fields: ["id", "documentId"],
    },
    { encodeValuesOnly: true }
  );

  const baseUrl =
    process.env.STRAPI_BASE_URL ||
    "https://r810983k-1337.euw.devtunnels.ms/api";

  try {
    const res = await fetch(`${baseUrl}/articles?${query}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}