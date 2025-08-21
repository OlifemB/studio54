import Link from "next/link";
import {nav_data} from "@/common/data/menu";

export const Footer = () => {
  return (
    <footer className={'h-[90px] border-0 border-t border-t-[#5B5C5D] text-[#FFFFFF] w-screen bg-[#181818]'}>
      <div className={'container mx-auto flex flex-row h-full items-center justify-between'}>
        <div className={'flex flex-row items-center gap-[15px]'}>
          <Link href={'/public'} className={'text-[36px]'}>architecture</Link>
          <div className={'text-[#5B5C5D]'}>(с) 2025, all rights reserved</div>
        </div>
        <nav className={'flex flex-row gap-[24px]'}>
          <ul className={'flex flex-row gap-[35px] text-[16px]'}>
            {nav_data.map((item) => (
              <li key={item.title} className={'hover:text-[#2969CA] hover:underline duration-300'}>
                <Link href={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul>

          <span className={'text-[#FFFFFF]'}>|</span>

          <div className={'text-[16px]'}>
            <Link href={'tel:89118183410'}>+7 (911) 818-34-10</Link>
          </div>
        </nav>
      </div>
    </footer>
  );
};