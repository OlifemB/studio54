"use client";

import {useEffect, useState} from "react";
import Image from "next/image";
import {useParams} from "next/navigation";

interface Media {
  url: string;
  alternativeText?: string;
}

interface Hero {
  title: string;
  description: string;
  background?: Media;
  foreground?: Media;
  action?: {
    link: string;
    label: string;
  };
}

interface Article {
  id: number;
  documentId: string;
  Hero?: Hero;
  content?: string; // основной текст статьи
  images?: Media[]; // дополнительные картинки
}

export default function ArticlePage() {
  const params = useParams();
  const {id} = params; // <-- documentId из URL
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchArticle() {
      try {
        const res = await fetch(`/api/articles/${id}`);
        const data = await res.json();
        setArticle(data?.data || null);
      } catch (error) {
        console.error("Ошибка загрузки статьи:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [id]);

  if (loading)
    return <p className="p-4">Загрузка...</p>;

  if (!article)
    return <p className="p-4">Статья не найдена</p>;

  const hero = article.Hero;
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_BASE_URL?.replace("/api", "") || "";

  const backgroundUrl = hero?.background?.url ? `${baseUrl}${hero.background.url}` : null;
  const foregroundUrl = hero?.foreground?.url ? `${baseUrl}${hero.foreground.url}` : null;


  return (
    <div className="container mx-auto py-6">
      {/* Hero Background */}
      {backgroundUrl && (
        <div className="relative w-full h-72 mb-6">
          <Image
            src={backgroundUrl}
            alt={hero?.background?.alternativeText || hero?.title || "Article Hero"}
            fill
            className="object-cover rounded-2xl shadow-md"
          />
        </div>
      )}

      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">{hero?.title}</h1>

      {/* Description */}
      {hero?.description && <p className="text-lg text-gray-700 mb-6">{hero.description}</p>}

      {/* Foreground Image */}
      {foregroundUrl && (
        <div className="relative w-80 h-80 mx-auto mb-6">
          <Image
            src={foregroundUrl}
            alt={hero?.foreground?.alternativeText || "Foreground"}
            fill
            className="object-contain rounded-xl"
          />
        </div>
      )}

      {/* Основной текст статьи */}
      {article.content && (
        <div className="prose prose-lg max-w-none mb-6">
          <div dangerouslySetInnerHTML={{__html: article.content}}/>
        </div>
      )}

      {/* Дополнительные картинки */}
      {article.images && article.images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {article.images.map((img, idx) => (
            <div key={idx} className="relative w-full h-64">
              <Image
                src={`${baseUrl}${img.url}`}
                alt={img.alternativeText || `image-${idx}`}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      )}

      {/* CTA кнопка */}
      {hero?.action?.link && hero?.action?.label && (
        <div className="mt-8">
          <a
            href={hero.action.link}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            {hero.action.label}
          </a>
        </div>
      )}
    </div>
  );
}