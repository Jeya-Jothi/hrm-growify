import ChaosToClarity from "@/components/sections/ChaosToClarity";
import Hero from "@/components/sections/Hero";
import HRSystemWheel from "@/components/sections/HRSystemWheel";
import Metrics from "@/components/sections/Metrics";
import Testimonials from "@/components/sections/Testimonials";
import PlanPricing from "@/components/sections/PlanPricing";
import GetStarted from "@/components/sections/GetStarted";
import FAQSection from "@/components/sections/FAQSection";
import Showcase from "@/components/sections/ShowCase";

const Page = () => {
  return (
    <main>
      <Hero />
      <Showcase />
      <ChaosToClarity />
      <HRSystemWheel />
      <PlanPricing />
      <Metrics />
      <Testimonials />
      <GetStarted />
      <FAQSection />
    </main>
  );
};

export default Page;
