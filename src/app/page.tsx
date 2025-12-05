import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import Services from "@/components/Services";
import Contact from "@/components/Contact";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <Services />
      <Contact />
    </main>
  );
}
