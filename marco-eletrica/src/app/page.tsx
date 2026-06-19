import { Hero } from "../components/Hero";
import { ServicesOverview } from "../components/ServicesOverview";
import { Services } from "../components/Services";
import { WhyUs } from "../components/WhyUs";
import { Awards } from "../components/Awards";
import { ShowCase } from "../components/ShowCase";
import FAQ from "../components/FAQ";
import { Contact } from "../components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesOverview />
      <Services />
      <WhyUs />
      <Awards />
      <ShowCase />
      <FAQ />
      <Contact />
    </main>
  );
}
