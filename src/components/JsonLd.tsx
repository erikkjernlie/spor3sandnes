const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BarOrPub",
  name: "Spor 3 Sandnes",
  alternateName: "Spor 3",
  description:
    "En lun og folkelig bar i hjertet av Sandnes sentrum. Vi serverer gode drinker fra proffe bartendere og mat fra à la carte meny til moderate priser. Utesevering med varmeovner.",
  url: "https://www.spor3sandnes.no",
  telephone: "+4751536900",
  email: "sanne.jakob@gmail.com",
  image: "https://www.spor3sandnes.no/spor3.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kirkegata 1",
    addressLocality: "Sandnes",
    postalCode: "4307",
    addressRegion: "Rogaland",
    addressCountry: "NO",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 58.8498,
    longitude: 5.7352,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "17:00",
      closes: "00:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "15:00",
      closes: "00:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "13:00",
      closes: "00:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "15:00",
      closes: "00:30",
    },
  ],
  servesCuisine: ["Bar mat", "À la carte", "Tapas"],
  priceRange: "$$",
  currenciesAccepted: "NOK",
  paymentAccepted: "Cash, Credit Card, Vipps",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "3",
    bestRating: "5",
  },
  review: [
    {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      name: "Knallbra mat og drikke",
      reviewBody:
        "Veldig god biff og gode drinker! Hyggelig betjening! Kommer garantert tilbake hit!",
    },
    {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      name: "Beste biffen i Rogaland",
      reviewBody:
        "Dette er definitivt favorittplassen når man skal ut å spise! Perfekt biff, service, atmosfære, drinker osv.",
    },
    {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      name: "Veldig høy standard på drinkene",
      reviewBody:
        "Hyggelig atmosfære og god service. De har gode tapas rett og snacks som passer ypperlig sent på kvelden.",
    },
  ],
  sameAs: ["https://www.facebook.com/SPOR3Sandnes/"],
  hasMenu: "https://cdn.prod.website-files.com/63a2161950ebce0ce95268f9/6985d7bce3b0bcfd13203048_meny2026%20korrektur2.pdf",
  acceptsReservations: "True",
  potentialAction: {
    "@type": "ReserveAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://spor-3.resos.com/booking",
    },
    result: {
      "@type": "Reservation",
      name: "Book bord hos Spor 3 Sandnes",
    },
  },
};

const JsonLd = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
  />
);

export default JsonLd;
