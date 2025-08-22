import Image from "next/image";
import React from "react";

type StrapiImage = {
  url: string;
  alternativeText?: string;
};

type ContentBlock = {
  id: number;
  __component: string;
  text?: string;
  image?: StrapiImage | null;
  value?: string;
};

export default function ContentRenderer({ content }: { content: ContentBlock[] }) {
  if (!content?.length) return null;

  return (
    <div className="flex flex-wrap gap-6 mt-8">
      {content.map((block, index) => {
        const className = `card p-4 rounded-xl shadow-md ${block.__component.replace(/\./g, "-")}`;

        const widthStyle: React.CSSProperties = {};
        if (block.value?.startsWith("width=")) {
          widthStyle.width = block.value.replace("width=", "");
        }

        return (
          <div key={block.id+index} className={className} style={widthStyle}>
            {block.image && (
              <div className="mb-4 flex justify-center">
                <img
                  src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${block.image.url}`}
                  alt={block.image.alternativeText || "image"}
                  className="rounded-lg shadow max-w-full"
                />
              </div>
            )}

            {block.text && (
              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: block.text }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
