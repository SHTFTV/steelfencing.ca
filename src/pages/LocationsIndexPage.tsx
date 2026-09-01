import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { LOWER_MAINLAND_CITIES, LS_FENCING } from '../data/installerPartner';
import { InstallerFloater } from '../components/InstallerFloater';

export function LocationsIndexPage() {
  const fraserValley = LOWER_MAINLAND_CITIES.filter((c) => c.region === 'Fraser Valley');
  const lowerMainland = LOWER_MAINLAND_CITIES.filter((c) => c.region === 'Lower Mainland');

  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen">
      <section className="border-b border-neutral-800 bg-gradient-to-b from-neutral-900 to-neutral-950 px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
            Service Area
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-['Space_Grotesk']">
            Steel Fencing Installers, Lower Mainland &amp; Fraser Valley, BC
          </h1>
          <p className="mt-4 text-neutral-400 max-w-2xl">
            For steel fencing, ornamental gates, barrier rail, and welding work in the Lower
            Mainland and Fraser Valley, SteelFencing.ca connects you with{' '}
            <a
              href={LS_FENCING.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 font-semibold"
            >
              {LS_FENCING.name}
            </a>
            , an Abbotsford-based crew serving the region since {LS_FENCING.since}. Pick your
            city below for local contact details.
          </p>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="max-w-5xl mx-auto space-y-12">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4">
              Fraser Valley
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {fraserValley.map((city) => (
                <Link
                  key={city.slug}
                  to={`/locations/${city.slug}`}
                  className="group rounded-xl border border-neutral-800 bg-neutral-900 p-5 hover:border-amber-500/50 transition-colors"
                >
                  <div className="flex items-center gap-2 text-neutral-200 font-semibold">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                    {city.name}, BC
                  </div>
                  <p className="mt-2 text-xs text-neutral-500">{city.blurb}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-amber-400 group-hover:gap-1.5 transition-all">
                    View {city.name} page <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4">
              Lower Mainland
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {lowerMainland.map((city) => (
                <Link
                  key={city.slug}
                  to={`/locations/${city.slug}`}
                  className="group rounded-xl border border-neutral-800 bg-neutral-900 p-5 hover:border-amber-500/50 transition-colors"
                >
                  <div className="flex items-center gap-2 text-neutral-200 font-semibold">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                    {city.name}, BC
                  </div>
                  <p className="mt-2 text-xs text-neutral-500">{city.blurb}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-amber-400 group-hover:gap-1.5 transition-all">
                    View {city.name} page <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <InstallerFloater installer={LS_FENCING} />
    </div>
  );
}
