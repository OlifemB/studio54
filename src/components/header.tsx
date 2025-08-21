import Link from "next/link";

const nav_data = [
  {
    title: 'Projects',
    link: '/projects',
  },
  {
    title: 'News',
    link: '/news',
  },
  {
    title: 'Blog',
    link: '/blog',
  },
  {
    title: 'Contacts',
    link: '/contact',
  },
];

export const Header = () => {
  return (
    <header className={'h-[90px] border border-b border-[#D6D9DC]'}>
      <div className={'container mx-auto flex flex-row h-full items-center justify-between'}>
        <Link href={'/'} className={'text-[36px]'}>architecture</Link>

        <nav className={'flex flex-row gap-[24px]'}>
          <ul className={'flex flex-row gap-[35px] text-[16px]'}>
            {nav_data.map((item) => (
              <li key={item.title}>
                <Link href={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul>

          <div className={'text-[16px]'}>
            <Link href={'tel:89118183410'}>+7 (911) 818-34-10</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};