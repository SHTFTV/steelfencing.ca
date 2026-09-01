import { useState } from 'react';
import { Phone, MessageSquare, Mail, Star, ExternalLink, X } from 'lucide-react';
import { InstallerPartner } from '../data/installerPartner';

// Sticky call/text/email/reviews contact card, matching the widget L.S Fencing & Metal Work
// runs on their own site (lsfencingandmetalwork.com) -- reused here since they are the real
// installer we're pointing visitors to on these city pages.
export function InstallerFloater({ installer }: { installer: InstallerPartner }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const fullStars = Math.floor(installer.googleRating);
  const hasHalfStar = installer.googleRating - fullStars >= 0.5;

  return (
    <div className="fixed bottom-5 right-5 z-40 w-[280px] rounded-xl border border-neutral-800 bg-neutral-900 shadow-2xl shadow-black/50 animate-in fade-in slide-in-from-bottom-4">
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="absolute right-3 top-3 text-neutral-500 hover:text-neutral-200 transition-colors"
      >
        <X size={16} />
      </button>

      <div className="p-4 pb-3">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
          Talk to {installer.shortName}
        </p>
        <p className="text-sm font-semibold text-neutral-50 mt-0.5">Free on-site quotes</p>
      </div>

      <div className="px-4 pb-4 space-y-2">
        <a
          href={installer.phoneHref}
          className="flex items-center gap-3 rounded-lg bg-red-600 hover:bg-red-500 transition-colors px-3 py-2"
        >
          <Phone size={16} className="text-white shrink-0" />
          <span className="flex flex-col leading-tight">
            <span className="text-[10px] uppercase tracking-wide text-red-100">Call</span>
            <span className="text-sm font-semibold text-white">{installer.phone}</span>
          </span>
        </a>

        <a
          href={installer.textHref}
          className="flex items-center gap-3 rounded-lg border border-neutral-700 hover:border-neutral-500 transition-colors px-3 py-2"
        >
          <MessageSquare size={16} className="text-neutral-300 shrink-0" />
          <span className="flex flex-col leading-tight">
            <span className="text-[10px] uppercase tracking-wide text-neutral-500">Text</span>
            <span className="text-sm font-semibold text-neutral-100">{installer.text}</span>
          </span>
        </a>

        <a
          href={installer.emailHref}
          className="flex items-center gap-3 rounded-lg border border-neutral-700 hover:border-neutral-500 transition-colors px-3 py-2"
        >
          <Mail size={16} className="text-neutral-300 shrink-0" />
          <span className="flex flex-col leading-tight min-w-0">
            <span className="text-[10px] uppercase tracking-wide text-neutral-500">Email</span>
            <span className="text-sm font-semibold text-neutral-100 truncate">{installer.email}</span>
          </span>
        </a>

        <div className="rounded-lg border border-neutral-800 px-3 py-2.5">
          <p className="text-[10px] uppercase tracking-wide text-neutral-500 mb-1">Google Reviews</p>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-neutral-50">{installer.googleRating}</span>
            <span className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < fullStars || (i === fullStars && hasHalfStar)
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-neutral-700 text-neutral-700'
                  }
                />
              ))}
            </span>
            <span className="ml-auto text-xs rounded-full bg-neutral-800 px-2 py-0.5 text-neutral-300">
              {installer.googleReviewCount}
            </span>
          </div>
          <a
            href={installer.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-1.5 rounded-md bg-neutral-100 hover:bg-white transition-colors text-neutral-900 text-xs font-semibold py-1.5"
          >
            Read Google Reviews
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
