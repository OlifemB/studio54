import { NextResponse } from "next/server";

const STRAPI_GRAPHQL =
  process.env.NEXT_PUBLIC_STRAPI_BASE_URL?.replace(/\/$/, "") + "/graphql";

export async function GET() {
  try {
    const query = `
      query HomePage {
        homePage {
          documentId
          createdAt
          hero {
            id
            foreground {
              documentId
              name
              alternativeText
              caption
              width
              height
              formats
              hash
              ext
              mime
              size
              url
              previewUrl
              provider
              provider_metadata
              createdAt
              updatedAt
              publishedAt
            }
            background {
              documentId
              name
              alternativeText
              caption
              width
              height
              formats
              hash
              ext
              mime
              size
              url
              previewUrl
              provider
              provider_metadata
              createdAt
              updatedAt
              publishedAt
            }
            decritpion
            action {
              id
              link
              label
            }
          }
        }
      }
    `;

    const res = await fetch(STRAPI_GRAPHQL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
      cache: "no-store",
    });

    const json = await res.json();

    if (!res.ok || json.errors) {
      throw new Error(
        `GraphQL error: ${JSON.stringify(json.errors || json, null, 2)}`
      );
    }

    return NextResponse.json(json.data.homePage);
  } catch (err: any) {
    console.error("GraphQL fetch error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
