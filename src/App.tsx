import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import OpeningHours from "@/components/OpeningHours";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const App = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <OpeningHours />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
