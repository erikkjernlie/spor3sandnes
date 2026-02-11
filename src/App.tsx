import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import OpeningHours from "@/components/OpeningHours";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

const App = () => {
  return (
    <>
      <JsonLd />
      <div className="min-h-screen">
        <header>
          <Navigation />
        </header>
        <main>
          <Hero />
          <OpeningHours />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
