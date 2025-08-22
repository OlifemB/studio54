"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Seo = {
  id: number;
  title: string;
  slug: string;
};

type Tag = {
  id: number;
  documentId: string;
  system_title: string;
  seo: Seo;
};

type StrapiResponse<T> = {
  data: T[];
};

export default function TagsList() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTags() {
      try {
        const res = await fetch("/api/tags");
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const json: StrapiResponse<Tag> = await res.json();
        setTags(json.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTags();
  }, []);

  if (loading) return <p className="p-4">Loading tags...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto py-6 flex flex-wrap gap-3">
      {tags.map((tag) => (
        <Link
          key={tag.documentId}
          href={`/tags/${tag.seo.slug.replace(/^\//, "")}`}
          className="px-4 py-2 rounded-full  text-gray-400 text-sm font-medium border border-transparent transition hover:border-white duration-300 hover:text-white"
        >
          {tag.system_title}
        </Link>
      ))}
    </div>
  );
}
