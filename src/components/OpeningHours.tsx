import { Clock, Facebook } from "lucide-react";

const barHours = [
  { day: "Man-Tors", time: "17.00-00.30" },
  { day: "Fredag", time: "15.00-00.30" },
  { day: "Lørdag", time: "13.00-00.30" },
  { day: "Søndag", time: "15.00-00.30" },
];

const kitchenHours = [
  { day: "Man-Tirs", time: "Stengt" },
  { day: "Ons-Tors", time: "17.00-21.00" },
  { day: "Fre-Søn", time: "15.00-21.00" },
];

const HoursCard = ({
  title,
  hours,
}: {
  title: string;
  hours: { day: string; time: string }[];
}) => (
  <div className="card p-6 md:p-8">
    <div className="flex items-center justify-center gap-3 mb-6">
      <Clock className="w-5 h-5 text-pub-gold" aria-hidden="true" />
      <h3 className="text-xl md:text-2xl font-serif font-semibold text-pub-gold tracking-wide">
        {title}
      </h3>
    </div>
    <dl className="space-y-3">
      {hours.map((h) => (
        <div key={h.day} className="flex justify-between items-center">
          <dt className="text-pub-warm/70">{h.day}</dt>
          <dd
            className={`font-semibold ${
              h.time === "Stengt" ? "text-red-400/80" : "text-pub-gold"
            }`}
          >
            {h.time}
          </dd>
        </div>
      ))}
    </dl>
  </div>
);

const OpeningHours = () => {
  return (
    <section
      id="apningstider"
      className="py-20 md:py-28 bg-pub-dark"
      aria-label="Åpningstider for Spor 3 Sandnes"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="section-title">Åpningstider</h2>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
          <HoursCard title="Bar" hours={barHours} />
          <HoursCard title="Kjøkken" hours={kitchenHours} />
        </div>

        <div className="text-center mt-10">
          <a
            href="https://www.facebook.com/SPOR3Sandnes/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-pub-gold/80 hover:text-pub-gold transition-colors group"
            aria-label="Besøk Spor 3 Sandnes på Facebook"
          >
            <Facebook
              className="w-5 h-5 group-hover:scale-110 transition-transform"
              aria-hidden="true"
            />
            <span className="text-sm md:text-base">
              Se vår Facebook-side for oppdateringer og nyheter
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default OpeningHours;
