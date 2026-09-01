import { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Phone, MessageSquare, Star, ExternalLink, MapPin } from 'lucide-react';
import { LOWER_MAINLAND_CITIES, LS_FENCING } from '../data/installerPartner';
import { InstallerFloater } from '../components/InstallerFloater';

export function LocationPage() {
  const { citySlug } = useParams<{ citySlug: string }>();
  const city = LOWER_MAINLAND_CITIES.find((c) => c.slug === citySlug);

  useEffect(() => {
    if (city) {
      document.title = `Steel Fencing & Welding, ${city.name} BC | ${LS_FENCING.name} — SteelFencing.ca`;
    }
  }, [city]);

  if (!city) {
    return <Navigate to="/locations" replace />;
  }

  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen">
      <section className="border-b border-neutral-800 bg-gradient-to-b from-neutral-900 to-neutral-950 px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <nav className="text-xs text-neutral-500 mb-4">
            <Link to="/" className="hover:text-amber-400">Home</Link>
            <span className="mx-1.5">/</span>
            <Link to="/locations" className="hover:text-amber-400">Locations</Link>
            <span className="mx-1.5">/</span>
            <span className="text-neutral-300">{city.name}, BC</span>
          </nav>

          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
            <MapPin className="w-3.5 h-3.5" /> {city.region}, BC
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-['Space_Grotesk']">
            Steel Fencing &amp; Welding in {city.name}, BC
          </h1>
          <p className="mt-4 text-neutral-400 max-w-2xl">
            {city.blurb} SteelFencing.ca works with{' '}
            <a
              href={LS_FENCING.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 font-semibold"
            >
              {LS_FENCING.name}
            </a>
            , an {LS_FENCING.hq}-based crew serving the {LS_FENCING.serviceRegionLabel} since{' '}
            {LS_FENCING.since}, for fencing, gates, steel railings, and on-site welding work in{' '}
            {city.name}.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={LS_FENCING.phoneHref}
              className="inline-flex items-center gap-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-5 py-3 text-sm transition-colors"
            >
              <Phone className="w-4 h-4" /> Call {LS_FENCING.phone}
            </a>
            <a
              href={LS_FENCING.textHref}
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 hover:border-neutral-500 text-neutral-200 font-semibold px-5 py-3 text-sm transition-colors"
            >
              <MessageSquare className="w-4 h-4" /> Text {LS_FENCING.text}
            </a>
          </div>
        </div>
      </section>

      {/* Trust stats -- all real, sourced from lsfencingandmetalwork.com */}
      <section className="px-4 py-10 border-b border-neutral-800">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-extrabold text-white">{LS_FENCING.yearsInTrade.split(' ')[0]}</div>
            <div className="text-[11px] uppercase tracking-wide text-neutral-500 mt-1">Years in Trade</div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white">{LS_FENCING.projectsInstalled.split(' ')[0]}</div>
            <div className="text-[11px] uppercase tracking-wide text-neutral-500 mt-1">Projects Installed</div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white">100%</div>
            <div className="text-[11px] uppercase tracking-wide text-neutral-500 mt-1">Fully Insured</div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white flex items-center justify-center gap-1">
              {LS_FENCING.googleRating}
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
            <div className="text-[11px] uppercase tracking-wide text-neutral-500 mt-1">
              {LS_FENCING.googleReviewCount} Google Reviews
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-4 py-14">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-white font-['Space_Grotesk'] mb-2">
            Services in {city.name}
          </h2>
          <p className="text-sm text-neutral-500 mb-6">
            {LS_FENCING.tagline}
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {LS_FENCING.services.map((service) => (
              <div key={service.name} className="rounded-xl border border-neutral-800 bg-neutral-900 p-5">
                <h3 className="font-semibold text-neutral-100">{service.name}</h3>
                <p className="mt-1.5 text-xs text-neutral-500 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews CTA */}
      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto rounded-xl border border-neutral-800 bg-neutral-900 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold text-white">{LS_FENCING.googleRating}</span>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs text-neutral-500">({LS_FENCING.googleReviewCount} Google reviews)</span>
            </div>
            <p className="text-sm text-neutral-400 mt-1">
              Rated by real customers of {LS_FENCING.shortName} across the Fraser Valley &amp; Lower Mainland.
            </p>
          </div>
          <a
            href={LS_FENCING.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-100 hover:bg-white text-neutral-900 font-semibold px-4 py-2.5 text-sm transition-colors shrink-0"
          >
            Read Google Reviews <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* Other cities */}
      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4">
            Also serving nearby
          </h2>
          <div className="flex flex-wrap gap-2">
            {LOWER_MAINLAND_CITIES.filter((c) => c.slug !== city.slug).map((c) => (
              <Link
                key={c.slug}
                to={`/locations/${c.slug}`}
                className="text-xs rounded-full border border-neutral-800 px-3 py-1.5 text-neutral-400 hover:text-amber-400 hover:border-amber-500/50 transition-colors"
              >
                {c.name}, BC
              </Link>
            ))}
          </div>
        </div>
      </section>

      <InstallerFloater installer={LS_FENCING} />

      <script
        type="application/ld+json"
        // JSON-LD for the local service being featured on this page
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://steelfencing.ca/' },
                  { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://steelfencing.ca/locations' },
                  { '@type': 'ListItem', position: 3, name: `${city.name}, BC`, item: `https://steelfencing.ca/locations/${city.slug}` },
                ],
              },
              {
                '@type': 'LocalBusiness',
                name: LS_FENCING.name,
                telephone: LS_FENCING.phone,
                email: LS_FENCING.email,
                url: LS_FENCING.website,
                areaServed: `${city.name}, BC`,
                address: { '@type': 'PostalAddress', addressLocality: 'Abbotsford', addressRegion: 'BC', addressCountry: 'CA' },
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: LS_FENCING.googleRating,
                  reviewCount: LS_FENCING.googleReviewCount,
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
