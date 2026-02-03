import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { CategorySection } from "@/components/home/CategorySection";
import { StatsSection } from "@/components/home/StatsSection";
import { AgencySection } from "@/components/home/AgencySection";
import { LatestReleasesSection } from "@/components/home/LatestReleasesSection";

const Home = () => {
  return (
    <Layout>
      <HeroSection />
      <CategorySection />
      <StatsSection />
      <AgencySection />
      <LatestReleasesSection />
    </Layout>
  );
};

export default Home;
