import { Hero } from "./components/hero";
import { About } from "./components/about";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { FeaturedProjects } from "./components/featured-projects";

export default function Page() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <FeaturedProjects />
      <Footer />
    </main>
  );
}
