import Banner from "./Banner";
import BannerSubtitle from "./BannerSubtitle";
import FeaturedProjects from "./FeaturedProjects";

export default function Home({ featuredProjects = [] } = {}) {
  return (
    <div>
      <Banner />
      <BannerSubtitle />
      <FeaturedProjects featuredProjects={featuredProjects} />
    </div>
  );
}
