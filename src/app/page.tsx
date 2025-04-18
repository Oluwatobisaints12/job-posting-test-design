import Image from "next/image";
import Advertisement from "./components/advertisement";
import PopularPodcasts from "./components/editor-feature";
import PodcastRow from "./components/featured-postcast";
import PodcastBrowser from "./components/latest-episodes";
import LabelCategory from "./components/label-category";
import GlobalPartners from "./components/global-partners";
import CategoryPodcasts from "./components/category-podcasts";
import NewsletterSignup from "./components/get-me-in";
import { Container } from "./components/ui/container";

export default function Home() {
  return (
    <div className="bg-white">
      <Container>
        <Advertisement />
        <PopularPodcasts />
        <PodcastRow />
        <PodcastBrowser />
        <LabelCategory />
        <CategoryPodcasts />
        <NewsletterSignup />
        <GlobalPartners />
      </Container>
    </div>
  );
}
