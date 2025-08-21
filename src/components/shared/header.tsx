import Link from "next/link";
import {nav_data} from "@/common/data/menu";

export const Header = () => {
  return (
    <header
      className={'h-[90px] border-0 border-[#D6D9DC] text-[#020202] sticky top-0 w-screen bg-white/1 backdrop-blur-md z-20'}
    >
      <div className={'container mx-auto flex flex-row h-full items-center justify-between'}>
        <Link href={'/'} className={'text-[36px]'}>architecture</Link>

        <nav className={'flex flex-row gap-[24px]'}>
          <ul className={'flex flex-row gap-[35px] text-[16px]'}>
            {nav_data.map((item) => (
              <li key={item.title} className={'hover:text-[#2969CA] hover:underline duration-300'}>
                <Link href={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul>

          <span className={'text-[#9C9393]'}>|</span>

          <div className={'text-[16px]'}>
            <Link href={'tel:89118183410'}>+7 (911) 818-34-10</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};