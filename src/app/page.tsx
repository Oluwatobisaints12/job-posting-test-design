import Image from "next/image";
import Advertisement from "./components/advertisement";
import PopularPodcasts from "./components/editor-feature";
import PodcastRow from "./components/featured-postcast";
import PodcastBrowser from "./components/latest-episodes";
import LabelCategory from "./components/label-category";
import GlobalPartners from "./components/global-partners";
import NewsAndStorytelling from "./components/podcasts-category";
import EductaionalCategory from "./components/eductaional-category";
import EntertainmentLifestyle from "./components/entertainment-lifestyle";
import SportBusiness from "./components/sport-business";
import OtherPodcast from "./components/other-podcast";
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
        <NewsAndStorytelling />
        <EductaionalCategory />
        <EntertainmentLifestyle />
        <SportBusiness />
        <OtherPodcast />
        <NewsletterSignup />
        <GlobalPartners />
      </Container>
    </div>
  );
}
