import { Star, Quote } from "lucide-react";
import sittingGroupImage from "@/assets/sitting-group.jpg";

const testimonials = [
  {
    title: "Knallbra mat og drikke",
    content:
      "Veldig god biff og gode drinker! Hyggelig betjening! Kommer garantert tilbake hit! Det gikk også ganske fort fra vi bestilte til både mat og drikke var på bordet. Takk for en veldig koselig kveld.",
    rating: 5,
  },
  {
    title: "Beste biffen i Rogaland",
    content:
      "Dette er definitivt favorittplassen når man skal ut å spise! Blandt venner har det blitt en selvfølge at det er hit vi skal når vi skal ut. Perfekt biff, service, atmosfære, drinker osv.. Anbefales absolutt!",
    rating: 5,
  },
  {
    title: "Veldig høy standard på drinkene",
    content:
      "Hyggelig atmosfære og god service. De har gode tapas rett og snacks som passer ypperlig sent på kvelden.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      aria-label="Anmeldelser av Spor 3 Sandnes"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${sittingGroupImage})` }}
        role="img"
        aria-label="Gjester som koser seg i Spor 3 bar Sandnes"
      />
      <div className="absolute inset-0 bg-pub-darker/75 backdrop-blur-[2px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="section-title">Hva gjestene sier om Spor 3</h2>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <article
              key={i}
              className="bg-pub-warm/95 backdrop-blur-sm rounded-lg p-6 md:p-8 shadow-2xl transform hover:-translate-y-1 transition-transform duration-300"
            >
              <Quote className="w-8 h-8 text-pub-gold/30 mb-4" aria-hidden="true" />
              <div className="flex items-center gap-1 mb-4" aria-label={`${t.rating} av 5 stjerner`}>
                {[...Array(t.rating)].map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-pub-gold text-pub-gold"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <h3 className="text-lg font-serif font-semibold text-pub-dark mb-3">
                {t.title}
              </h3>
              <p className="text-pub-dark/70 leading-relaxed text-sm">
                {t.content}
              </p>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://no.tripadvisor.com/Restaurant_Review-g226926-d21186516-Reviews-Spor_3-Sandnes_Rogaland_Western_Norway.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block opacity-80 hover:opacity-100 transition-opacity"
            aria-label="Se Spor 3 Sandnes på TripAdvisor"
          >
            <img
              src="/tripadvisor-rated.png"
              alt="Spor 3 Sandnes på TripAdvisor - høyt rangert bar og restaurant"
              className="h-10 md:h-12"
              width="120"
              height="48"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
