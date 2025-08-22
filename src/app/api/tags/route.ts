import {NextResponse} from "next/server";
import Strapi from "strapi-sdk-js";

const strapi = new Strapi({
  url: "https://r810983k-1337.euw.devtunnels.ms",
});

export async function GET() {
  try {
    const tags = await strapi.find("tags", {
      populate: "*",
    });

    return NextResponse.json(tags);
  } catch (err: any) {
    console.error("Strapi fetch error:", JSON.stringify(err, null, 2));
    return NextResponse.json({error: err.message}, {status: 500});
  }
}
