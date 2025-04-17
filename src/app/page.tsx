import Image from "next/image";
import Header from "./components/header";
import SubHeader from "./components/sub-header";
import Advertisement from "./components/advertisement";
import PopularPodcasts from "./components/editor-feature";
import PodcastRow from "./components/featured-postcast";
import PodcastBrowser from "./components/latest-episodes";
import LabelCategory from "./components/label-category";
import Footer from "./components/footer";
import GlobalPartners from "./components/global-partners";
import NewsAndStorytelling from "./components/podcasts-category";
import EductaionalCategory from "./components/eductaional-category";
import EntertainmentLifestyle from "./components/entertainment-lifestyle";
import SportBusiness from "./components/sport-business";
import OtherPodcast from "./components/other-podcast";
import NewsletterSignup from "./components/get-me-in";

export default function Home() {
  return (
    <div className="">
    <Header />
    <SubHeader />
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
    <Footer />
    </div>
  );
}
