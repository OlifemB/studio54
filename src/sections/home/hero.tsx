'use client'

import Image from "next/image";
import hero_img from "@/common/img/hero-bg.png"
import {Button} from "@/components/ui/button";
import {HeroText} from "@/components/ui/hero_text";

export const SectionHomeHero = () => {
  return (
    <section id={'hero'} className={'relative w-full h-[848px]'}>
      <div className={'container mx-auto h-full'}>
        <Image
          src={hero_img}
          width={1712}
          height={824}
          alt={'hero_bg'}
          className={'absolute w-[1712px] h-[824px] left-[50%] transform -translate-x-[100%] top-0 z-10'}
        />

        <div className={'mt-[109px] w-full h-auto fill-[#D7DADE]' }>
          <HeroText/>
        </div>

        <div
          className={'absolute left-[50%] top-[371px] w-[580px] flex flex-col gap-[27px] items-start justify-start'}>
            <span className={'text-[16px]'}>
              We, as a brand, turn your dreams into fantastique interiors and architectural designs.
              Our projects inspire the pursuit of your great aspirations. We create the alchemy of luxury and the
              enjoyment of our clientèle
            </span>

          <Button className={''} variant={'outlined'} shape={'rounded'}>
            All projects
          </Button>
        </div>
      </div>

      <div className={'h-[112px] bg-[#181818] w-screen bottom-0 absolute'}>
        <div className={'container flex flex-col '}>

        </div>
      </div>
    </section>
  );
};