import { NextResponse } from "next/server";
import qs from "qs";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(req: Request, { params }: Params) {
  const { id } = params;

  const query = qs.stringify(
    {
      status: "published",
      populate: {
        Hero: { populate: "*" },
        images: { populate: "*" },
      },
      fields: ["id", "documentId", "content"],
    },
    { encodeValuesOnly: true }
  );

  const baseUrl =
    process.env.STRAPI_BASE_URL || "https://r810983k-1337.euw.devtunnels.ms/api";

  try {
    const res = await fetch(`${baseUrl}/articles/${id}?${query}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch article: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}