import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section
      id="kontakt"
      className="py-20 md:py-28 bg-pub-dark"
      aria-label="Kontakt Spor 3 Sandnes"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="section-title">Kontakt Spor 3</h2>

        <div className="card max-w-lg mx-auto p-8 md:p-10 text-center space-y-8">
          {/* Address */}
          <address className="flex flex-col items-center gap-3 not-italic">
            <div className="w-12 h-12 rounded-full bg-pub-gold/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-pub-gold" aria-hidden="true" />
            </div>
            <div>
              <p className="text-pub-warm font-semibold text-lg">Spor 3</p>
              <p className="text-pub-warm/70">Kirkegata 1</p>
              <p className="text-pub-warm/70">4307 Sandnes</p>
            </div>
          </address>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:sanne.jakob@gmail.com"
              className="btn-primary"
              aria-label="Send e-post til Spor 3 Sandnes"
            >
              <Mail className="w-4 h-4 mr-2" aria-hidden="true" />
              Send e-post
            </a>
            <a
              href="tel:+4751536900"
              className="btn-outline"
              aria-label="Ring Spor 3 Sandnes på telefon 51 53 69 00"
            >
              <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
              Ring oss
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
