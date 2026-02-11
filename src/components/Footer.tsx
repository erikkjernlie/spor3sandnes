import barImage from "@/assets/bar.jpg";

const Footer = () => {
  return (
    <footer className="relative py-20 md:py-28" aria-label="Bunntekst Spor 3 Sandnes">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${barImage})` }}
        role="img"
        aria-label="Bardisken på Spor 3 bar i Sandnes"
      />
      <div className="absolute inset-0 bg-pub-darker/85" />

      <div className="relative z-10 flex flex-col items-center justify-center gap-6 px-4">
        <img
          src="/spor3.png"
          alt="Spor 3 Sandnes"
          className="h-16 md:h-24 w-auto opacity-80"
          width="192"
          height="96"
        />
        <p className="text-pub-warm/40 text-xs tracking-widest uppercase">
          Kirkegata 1, 4307 Sandnes
        </p>
      </div>
    </footer>
  );
};

export default Footer;
