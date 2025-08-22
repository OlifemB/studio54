import { NextResponse } from "next/server";
import Strapi from "strapi-sdk-js";

const strapi = new Strapi({
  url:  "https://r810983k-1337.euw.devtunnels.ms",
});

export async function GET() {
  try {
    const articles = await strapi.find("articles", {
      populate: { Hero: { populate: "*" } },
      fields: ["id", "documentId"],
    });

    return NextResponse.json(articles);
  } catch (err: any) {
    console.error("Strapi fetch error:", JSON.stringify(err, null, 2));
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
