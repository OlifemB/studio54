"use client";

import {useEffect, useState} from "react";
import Image from "next/image";

type UploadFile = {
  url: string;
  alternativeText?: string;
};

type Hero = {
  id: string;
  decritpion: string;
  action?: {
    id: string;
    link: string;
    label: string;
  };
  foreground?: UploadFile;
  background?: UploadFile;
};

type HomepageData = {
  documentId: string;
  createdAt: string;
  hero: Hero;
};

export default function Homepage() {
  const [homepage, setHomepage] = useState<HomepageData | null>(null);

  useEffect(() => {
    const fetchHomepage = async () => {
      try {
        const res = await fetch("/api/homepage", {cache: "no-store"});
        const json = await res.json();
        console.log("Homepage response:", json);

        // API возвращает homePage напрямую
        setHomepage(json);
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
  const baseUrl =
    process.env.NEXT_PUBLIC_STRAPI_BASE_URL?.replace("/api", "") || "";
  const bgUrl = hero.background?.url ? `${baseUrl}${hero.background.url}` : "";
  const fgUrl = hero.foreground?.url ? `${baseUrl}${hero.foreground.url}` : "";

  return (
    <section id={'hero'} className={'relative w-full h-[748px] bg-[#F0F0F0] text-[303030]"'}>

      <div className={'container mx-auto h-full'}>
        {bgUrl && (
          <div className={'mt-[109px] w-full h-auto fill-[#D7DADE]'}>
            <img
              src={bgUrl}
              alt={hero.background?.alternativeText || "Background"}
            />
          </div>
        )}

        <div className="relative z-10 text-left px-4">
          <div
            className={'absolute left-[55%] top-[171px] w-[580px] flex flex-col gap-[27px] items-start justify- max-w-[50%]'}>
            {hero.decritpion && (
              <p className="text-lg  mb-6">{hero.decritpion}</p>
            )}
            {hero.action && (
              <a
                href={hero.action.link}
                className="inline-block bg-blue-600 text-white hover:bg-blue-700 font-semibold py-3 px-6 rounded-full transition"
              >
                {hero.action.label}
              </a>
            )}
          </div>
        </div>


        {fgUrl && (
          <div className="mt-8 flex justify-center">
            <Image
              src={fgUrl}
              alt={hero.foreground?.alternativeText || "Foreground"}
              width={1712}
              height={824}
              className={'absolute w-[1712px] h-[824px] left-[55%] transform -translate-x-[80%] -bottom-[90px] z-10'}
            />
          </div>
        )}
      </div>
    </section>
  );
}
