import {SectionHomeHero} from "@/sections/home/hero";
import {SectionHomePosts} from "@/sections/home/posts";
import ArticlesList from "@/components/articles/articles";
import Homepage from "@/components/homepage/homepage";
import TagsList from "@/components/tags/tags";


export default function Home() {
  return (
    <>
      <Homepage/>
      <TagsList/>
      <ArticlesList/>
      {/*<SectionHomeHero/>*/}
      {/*<SectionHomePosts/>*/}
    </>
  );
}
