import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Advantages } from "@/components/sections/Advantages";
import { Outcomes } from "@/components/sections/Outcomes";
import { Process } from "@/components/sections/Process";
import { Programs } from "@/components/sections/Programs";
import { Pricing } from "@/components/sections/Pricing";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Advantages />
        <Outcomes />
        <Process />
        <Programs />
        <Pricing />
        <CtaBanner />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
