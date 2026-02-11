import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import OpeningHours from "@/components/OpeningHours";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Admin from "@/pages/Admin";

const Home = () => (
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

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  </BrowserRouter>
);

export default App;
