import { Faqs, Features, Hero } from "@/components/home";
import { Footer, Navbar } from "@/components/layout";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Faqs />
      <Footer />
    </>
  );
}
