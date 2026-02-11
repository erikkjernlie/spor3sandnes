import heroImage from "@/assets/hero.jpg";

const MENU_URL =
  "https://cdn.prod.website-files.com/63a2161950ebce0ce95268f9/6985d7bce3b0bcfd13203048_meny2026%20korrektur2.pdf";
const BOOKING_URL = "https://spor-3.resos.com/booking";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-pub-darker/70 via-pub-darker/50 to-pub-darker/80" />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 py-20">
        <img
          src="/spor3.png"
          alt="Spor 3"
          className="mx-auto mb-8 h-20 md:h-32 w-auto drop-shadow-2xl"
        />
        <p className="text-lg md:text-xl text-pub-warm/90 max-w-2xl mx-auto mb-10 leading-relaxed text-shadow font-light">
          En lun og folkelig bar i hjertet av Sandnes sentrum. Vi serverer gode
          drinker fra proffe bartendere og mat fra à la carte meny til moderate
          priser. Utesevering med varmeovner.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={MENU_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Meny
          </a>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            Book bord
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-pub-gold/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-pub-gold/70 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
