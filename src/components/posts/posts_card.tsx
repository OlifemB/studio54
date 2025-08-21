import React from "react";
import Image from "next/image";

export interface PostsCardProps {
  image?: string,
  name: string,
  link: string
}

export const PostsCard: React.FC<{ item: PostsCardProps }> = ({item}) => {
  return (
    <div className={'w-full h-auto flex flex-col gap-[30px]'}>
      <Image
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={false}
        loading="lazy"
        src={item?.image || 'https://placehold.co/600x450/CCCCCC/333333?text=Нет+изображения'}
        alt={item?.name || ''}
        style={{objectFit: 'contain'}}
        onError={(e) => {
          e.currentTarget.onerror = null;
        }}
      />

      <div>
        Title
      </div>

      <div>
        Description
      </div>
    </div>
  );
};