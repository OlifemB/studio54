import Image from "next/image";
import {notFound} from "next/navigation";
import ContentRenderer from "@/components/articles/content_render";

interface Media {
  url: string;
  alternativeText?: string;
}

interface Hero {
  title?: string;
  description?: string;
  background?: Media;
  foreground?: Media;
  action?: { link: string; label: string };
}

interface Article {
  id: number;
  documentId: string;
  Hero?: Hero;
  content?: string;
  images?: Media[];
}

interface ApiResponse<T> {
  data: T;
}

function getStrapiOrigin() {
  const raw = process.env.NEXT_PUBLIC_STRAPI_BASE_URL || "";

  return raw.replace(/\/$/, "").replace(/\/api$/, "");
}

const STRAPI_ORIGIN = getStrapiOrigin();

function mediaUrl(path?: string) {
  if (!path) return "";
  return path.startsWith("http") ? path : `${STRAPI_ORIGIN}${path}`;
}

async function getArticle(id: string) {
  const res = await fetch(`http://localhost:3000/api/articles/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    if (res.status === 404) notFound();
    throw new Error("Failed to fetch article");
  }

  const json = (await res.json()) as ApiResponse<Article>;
  return json.data;
}

export default async function ArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const {id} = await params;
  const article = await getArticle(id);

  if (!article) notFound();

  const hero = article.Hero;
  const preview = article.preview;

  const imageUrl = mediaUrl(preview?.url);

  return (
    <section className={'bg-[#181818] text-gray-200 relative'}>
      <div className={'relative'}>
        {imageUrl && (
          <div className="relative w-full h-134 mb-6 brightness-50">
            <Image
              src={imageUrl}
              alt={hero?.background?.alternativeText || "Hero background"}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <div className={'container mx-auto'}>
          <div className={'absolute left-[50%] top-[50%] z-10 transform translate-y-[-50%] w-[40%]'}>
            {hero?.title && <h1 className="text-3xl font-bold mb-4">{hero.title}</h1>}

            {hero?.description && (
              <p className="text-lg  mb-6">{hero.description}</p>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto py-6  ">
        {article.content && <ContentRenderer content={article.content}/>}

        {article.images?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {article.images.map((img, i) => {
              const src = mediaUrl(img.url);
              if (!src) return null;
              return (
                <div key={i} className="relative w-full h-64">
                  <Image
                    src={src}
                    alt={img.alternativeText || `image-${i}`}
                    fill
                    className="object-cover "
                  />
                </div>
              );
            })}
          </div>
        ) : null}

        {hero?.action && (
          <div className="mt-8">
            <a
              href={hero.action.link}
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              {hero.action.label}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
