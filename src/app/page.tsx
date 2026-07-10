import {
  Hero,
  Stats,
  About,
  Extras,
  Process,
  Services,
  Gallery,
  VirtualTour,
  FAQ,
  Instagram,
  Footer,
} from "@/components";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-[#FAF9F6]">
      <Hero />
      <Stats />
      <About />
      <Extras />
      <Process />
      <Gallery />
      <VirtualTour />
      <Services />
      <FAQ />
      <Instagram />
      <Footer />
    </main>
  );
}
