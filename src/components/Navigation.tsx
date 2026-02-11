import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const MENU_URL = "/api/menu";
const BOOKING_URL = "https://spor-3.resos.com/booking";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-pub-darker/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
      aria-label="Hovednavigasjon"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="/" className="flex items-center gap-2 shrink-0" aria-label="Spor 3 Sandnes - Gå til forsiden">
            <img
              src="/spor3.png"
              alt="Spor 3 Sandnes logo"
              className="h-8 md:h-10 w-auto"
              width="80"
              height="40"
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href={MENU_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pub-warm/80 hover:text-pub-gold transition-colors font-medium"
            >
              Meny
            </a>
            <a
              href="#apningstider"
              className="text-pub-warm/80 hover:text-pub-gold transition-colors font-medium"
            >
              Åpningstider
            </a>
            <a
              href="#kontakt"
              className="text-pub-warm/80 hover:text-pub-gold transition-colors font-medium"
            >
              Kontakt
            </a>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline !py-2 !px-6 text-sm"
              aria-label="Book bord hos Spor 3 Sandnes"
            >
              Book bord
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-pub-warm p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Lukk meny" : "Åpne meny"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-pub-darker/98 backdrop-blur-md border-t border-pub-wood/30" role="menu">
          <div className="px-4 py-6 space-y-4">
            <a
              href={MENU_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-pub-warm/80 hover:text-pub-gold transition-colors font-medium"
              onClick={() => setMenuOpen(false)}
              role="menuitem"
            >
              Meny
            </a>
            <a
              href="#apningstider"
              className="block text-pub-warm/80 hover:text-pub-gold transition-colors font-medium"
              onClick={() => setMenuOpen(false)}
              role="menuitem"
            >
              Åpningstider
            </a>
            <a
              href="#kontakt"
              className="block text-pub-warm/80 hover:text-pub-gold transition-colors font-medium"
              onClick={() => setMenuOpen(false)}
              role="menuitem"
            >
              Kontakt
            </a>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline !py-2 !px-6 text-sm inline-block"
              onClick={() => setMenuOpen(false)}
              role="menuitem"
            >
              Book bord
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
