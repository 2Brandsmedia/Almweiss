import {
  Hero,
  Stats,
  About,
  Process,
  Services,
  Gallery,
  Instagram,
  Footer,
} from "@/components";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <Hero />
      <Stats />
      <About />
      <Process />
      <Gallery />
      <Services />
      <Instagram />
      <Footer />
    </main>
  );
}
