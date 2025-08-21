"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Hero = {
  id: number;
  __component: string;
  decritpion: string;
  action?: {
    id: number;
    link: string;
    label: string;
  };
  foreground?: {
    url: string;
    alternativeText?: string;
  };
  background?: {
    url: string;
    alternativeText?: string;
  };
};

type HomepageData = {
  id: number;
  documentId: string;
  system_title: string;
  hero: Hero;
};

export default function Homepage() {
  const [homepage, setHomepage] = useState<HomepageData | null>(null);

  useEffect(() => {
    const fetchHomepage = async () => {
      try {
        const res = await fetch("/api/homepage", { cache: "no-store" });
        const json = await res.json();
        console.log("Homepage response:", json);

        // GraphQL структура: json.data.homepage.data
        setHomepage(json.data.homepage.data);
      } catch (error) {
        console.error("Failed to fetch homepage", error);
      }
    };

    fetchHomepage();
  }, []);

  if (!homepage) {
    return <div className="p-4 text-gray-500">Loading homepage...</div>;
  }

  const hero = homepage.hero;
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_BASE_URL?.replace("/api", "");
  const bgUrl = hero.background?.url ? `${baseUrl}${hero.background.url}` : "";
  const fgUrl = hero.foreground?.url ? `${baseUrl}${hero.foreground.url}` : "";

  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center bg-gray-900 text-white">
      {/* Background image */}
      {bgUrl && (
        <Image
          src={bgUrl}
          alt={hero.background?.alternativeText || "Background"}
          fill
          className="object-cover"
          priority
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl text-center px-4">
        <h1 className="text-4xl font-bold mb-4">{homepage.system_title}</h1>
        {hero.decritpion && (
          <p className="text-lg text-gray-200 mb-6">{hero.decritpion}</p>
        )}
        {hero.action && (
          <a
            href={hero.action.link}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            {hero.action.label}
          </a>
        )}
        {/* Foreground image */}
        {fgUrl && (
          <div className="mt-8 flex justify-center">
            <Image
              src={fgUrl}
              alt={hero.foreground?.alternativeText || "Foreground"}
              width={400}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>
    </section>
  );
}