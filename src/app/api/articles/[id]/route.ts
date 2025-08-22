import Strapi from "strapi-sdk-js";

const strapi = new Strapi({
  url: "https://r810983k-1337.euw.devtunnels.ms",
});

interface Params {
  params: { id: string };
}

export async function GET(req: Request, context: Promise<Params>) {
  const { params } = await context;
  const id = params.id;

  try {
    const article = await strapi.findOne("articles", id, {
      fields: ["id", "documentId"],
      populate: {
        Hero: {
          fields: ["*"],
          populate: "*",
        },
        content: {
          on: {
            "ui-grid.text": { populate: "*" },
            "ui-grid.text-over-image": { populate: "*" },
            "ui-grid.image": { populate: "*" },
            "ui-grid.text-under-image": { populate: "*" },
          },
        },
        tags: { populate: "*" },
        preview: { fields: ["*"] },
        recommendations: { populate: "*" },
      },
    });

    if (!article) {
      return new Response(JSON.stringify({ error: "Article not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },

      });
    }

    return new Response(JSON.stringify(article), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching article:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}