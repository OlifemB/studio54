import { NextResponse } from "next/server";
import qs from "qs";

export async function GET() {
  const query = qs.stringify(
    {
      populate: {
        Hero: {
          populate: ["foreground", "background", "action"],
        },
      },
      fields: ["id", "documentId", "system_title"],
    },
    { encodeValuesOnly: true }
  );

  const baseUrl =
    process.env.STRAPI_BASE_URL || "https://r810983k-1337.euw.devtunnels.ms/graphql";

  try {
    const res = await fetch(`${baseUrl}/homepage?${query}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch homepage: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}