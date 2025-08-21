"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type StrapiImageFormat = {
  url: string;
  width: number;
  height: number;
};

type StrapiImage = {
  id: number;
  url: string;
  alternativeText: string | null;
  formats: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
  };
};

type Hero = {
  id: number;
  title: string;
  description: string;
  background: StrapiImage;
};

type Article = {
  id: number;
  documentId: string;
  Hero: Hero;
};

type StrapiResponse<T> = {
  data: T[];
};

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch("/api/articles");
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const json: StrapiResponse<Article> = await res.json();
        setArticles(json.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  if (loading) return <p className="p-4">Loading articles...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  const baseUrl =
    process.env.NEXT_PUBLIC_STRAPI_BASE_URL?.replace("/api", "") || "";

  return (
    <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((item) => {
        const hero = item.Hero;
        const bgUrl =
          hero?.background?.formats?.medium?.url ||
          hero?.background?.url ||
          "/placeholder.png";
        const fullUrl = bgUrl.startsWith("http") ? bgUrl : `${baseUrl}${bgUrl}`;

        return (
          <div
            key={item.id}
            className="bg-white shadow rounded-2xl overflow-hidden flex flex-col"
          >
            <div className="relative w-full h-48">
              <img
                src={fullUrl || ''}
              />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h2 className="text-lg font-semibold mb-2">{hero?.title}</h2>
              <p className="text-gray-600 flex-1">{hero?.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}