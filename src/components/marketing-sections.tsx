import Image from "next/image";
import { WaitlistForm } from "@/components/waitlist-form";
import { ExperienceCarousel } from "@/components/experience-carousel";
import { InfoTicker } from "@/components/info-ticker";

/**
 * Shared marketing sections rendered below the hero on both the default
 * homepage (`/`, scroll-scrub flythrough hero) and the `/test` variant
 * (background-video hero). Keeping them here means the two pages differ
 * only in their hero and never drift apart.
 */
export function MarketingSections() {
  return (
    <>
      <InfoTicker />
      <About />
      <ExperienceCarousel />
      <Team />
      <Invest />
      <Waitlist />
    </>
  );
}

/* -------------------------------- ABOUT -------------------------------- */

function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-20 bg-background py-24 md:scroll-mt-24 md:py-32"
    >
      <div className="container-prose">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="eyebrow">About</span>
            <h2 className="mt-4 text-display text-4xl text-foreground md:text-5xl">
              An eight-acre retreat at the edge of the Caribbean.
            </h2>
          </div>
          <div className="md:col-span-7">
            <p className="font-sans text-xl leading-relaxed text-foreground/90 md:text-2xl">
              Conception Grenada sits on a private stretch of waterfront at
              Point Salines — fourteen villas, a wellness clinic, and a spa
              built into the coastline. Mornings open onto sailboats and reef.
              Afternoons settle into shaded patios and the sound of the trade
              winds.
            </p>
            <p className="mt-6 font-sans text-lg leading-relaxed text-muted-foreground md:text-xl">
              The resort is designed for guests who want quiet — long stays,
              recovery, retreats, and slow weeks by the sea. No crowds, no
              concrete towers, no chain-hotel feel. Just architecture made for
              the light and the climate, and a small team that takes care of
              everything around it.
            </p>
          </div>
        </div>
      </div>

      {/* Stacking cards — each pins under the header and the next slides over it */}
      <div className="container-prose mt-20 md:mt-24">
        <div className="flex flex-col gap-8 md:gap-12">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="sticky"
              style={{ top: `calc(6rem + ${i * 2}rem)` }}
            >
              <article className="relative h-[62vh] min-h-[400px] overflow-hidden rounded-[2rem] border border-border/50 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.4)]">
                <Image
                  src={f.image}
                  alt={f.title}
                  fill
                  sizes="(min-width: 768px) 72rem, 100vw"
                  className="object-cover"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                  <span className="font-display text-sm tracking-wide text-sand">
                    {String(i + 1).padStart(2, "0")} / {String(FEATURES.length).padStart(2, "0")}
                  </span>
                  <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
                    <div className="max-w-xl">
                      <h3 className="font-display text-3xl font-medium text-white md:text-5xl">
                        {f.title}
                      </h3>
                      <p className="mt-3 max-w-md text-base leading-relaxed text-white/85 md:text-lg">
                        {f.body}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white/10 px-5 py-4 ring-1 ring-white/20 backdrop-blur-sm">
                      <div className="font-display text-2xl font-medium leading-none text-white md:text-3xl">
                        {f.stat}
                      </div>
                      <div className="mt-1.5 text-[11px] uppercase tracking-[0.18em] text-white/70">
                        {f.statLabel}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  {
    title: "Fourteen villas",
    body:
      "Two- and three-bedroom villas with private patios, indoor-outdoor living, and direct ocean views.",
    image: "/images/villa-patio-golden-hour.png",
    stat: "14",
    statLabel: "private villas",
  },
  {
    title: "Wellness clinic & spa",
    body:
      "On-site cosmetic surgery, recovery, and a full spa — the resort is designed around restoration.",
    image: "/images/villa-interior-living.png",
    stat: "26-bed",
    statLabel: "surgical clinic",
  },
  {
    title: "Point Salines coastline",
    body:
      "Waterfront on Grenada's southern peninsula. Reef, sailboats, and the trade winds.",
    image: "/images/ocean-view-sailboats.png",
    stat: "8.75",
    statLabel: "acres waterfront",
  },
];

/* --------------------------------- TEAM --------------------------------- */

const TEAM_STATS = [
  { value: "35+", label: "Years building hospitals" },
  { value: "100+", label: "Healthcare facilities" },
  { value: "ZAR 22B+", label: "NetCare market cap (JSE)" },
];

function Team() {
  return (
    <section
      id="team"
      className="relative scroll-mt-20 bg-background py-24 md:scroll-mt-24 md:py-32"
    >
      <div className="container-prose">
        <div className="max-w-2xl">
          <span className="eyebrow">Team</span>
          <h2 className="mt-4 text-display text-4xl text-foreground md:text-5xl">
            The people behind it.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            A small group of operators, builders, and clinicians who&apos;ve
            been doing this work for decades.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-12 lg:items-stretch">
          {/* Headshot box */}
          <div className="lg:col-span-5">
            <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-border/70 bg-gradient-to-b from-sand/35 to-card p-8 shadow-sm md:p-10">
              <div className="relative aspect-square w-full max-w-[280px] overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5">
                <Image
                  src="/images/team-gavin.png"
                  alt="Gavin Stassen"
                  fill
                  sizes="280px"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-6 font-display text-2xl font-medium tracking-tight text-foreground">
                Gavin Stassen
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Founder · CEO
              </p>
            </div>
          </div>

          {/* Bio box */}
          <div className="lg:col-span-7">
            <div className="flex h-full flex-col justify-center rounded-3xl border border-border/70 bg-card p-8 shadow-sm md:p-10">
              <span className="eyebrow">The founder</span>
              <p className="mt-4 font-sans text-lg leading-relaxed text-foreground/90">
                Built private hospitals and wellness facilities for 35+ years.
                Co-founded the NetCare Hospital Group (now ZAR 22B+ on the JSE)
                and has designed or advised on more than 100 healthcare projects.
              </p>
              <p className="mt-6 border-l-2 border-sand pl-4 font-display text-xl italic leading-snug text-foreground/90">
                Conception Grenada is his life&apos;s work, brought to the
                Caribbean.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border/60 pt-7">
                {TEAM_STATS.map((s) => (
                  <div key={s.label}>
                    <div className="font-display text-2xl font-medium text-foreground md:text-3xl">
                      {s.value}
                    </div>
                    <div className="mt-1 text-xs leading-snug text-muted-foreground">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Coming soon */}
        <div className="mt-6 flex flex-col items-start gap-4 rounded-3xl border border-border/70 bg-card/60 p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <span className="eyebrow">Coming soon</span>
            <p className="mt-2 max-w-xl font-sans text-base leading-relaxed text-muted-foreground">
              Lead clinician and on-site medical team — including the surgeon
              leading our cosmetic program — to be announced.
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-secondary px-4 py-2 text-xs font-semibold uppercase tracking-wide text-secondary-foreground">
            To be announced
          </span>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- INVEST -------------------------------- */

const OFFERING_STATS = [
  { value: "$16M", label: "Total raise" },
  { value: "$2.00", label: "Per token" },
  { value: "$4,000", label: "Minimum" },
  { value: "5–8%", label: "Target yield" },
];

function Invest() {
  return (
    <section
      id="invest"
      className="relative scroll-mt-20 bg-secondary py-20 md:scroll-mt-24 md:py-24"
    >
      <div className="container-prose">
        <div className="grid overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-[0_30px_80px_-25px_rgba(15,23,42,0.35)] lg:grid-cols-2">
          {/* Content */}
          <div className="p-10 md:p-14">
            <span className="eyebrow">For investors</span>
            <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-foreground md:text-4xl">
              There&apos;s also an ownership opportunity.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              A limited number of accredited investors can own a tokenized stake
              in the underlying real estate — issued through TierraDex, with its
              own diligence and disclosures.
            </p>

            <div className="mt-9 grid grid-cols-2 gap-x-8 gap-y-7">
              {OFFERING_STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl font-medium text-foreground">
                    {s.value}
                  </div>
                  <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://tierradex.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground transition-colors hover:bg-sand hover:text-sand-foreground"
            >
              Investor details on TierraDex
            </a>
            <p className="mt-4 max-w-md text-xs leading-relaxed text-muted-foreground">
              Reg D 506(c) · accredited investors only. Target yields are not
              guaranteed. This is not an offer to sell securities.
            </p>
          </div>

          {/* Image */}
          <div className="relative min-h-[320px] lg:min-h-full">
            <Image
              src="/images/resort-aerial-sunset.png"
              alt="Aerial view of the resort at sunset"
              fill
              sizes="(min-width: 1024px) 36rem, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent lg:bg-gradient-to-l" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- WAITLIST ------------------------------- */

function Waitlist() {
  return (
    <section
      id="waitlist"
      className="relative scroll-mt-20 bg-background py-24 md:scroll-mt-24 md:py-32"
    >
      <div className="container-prose">
        <div className="grid gap-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-6">
            <span className="eyebrow">Reservations</span>
            <h2 className="mt-4 text-display text-4xl text-foreground md:text-5xl">
              Be among the first to stay.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              The resort opens in stages. Join the waitlist and we&apos;ll
              email you once dates are available — before public booking.
            </p>
          </div>

          <div className="md:col-span-6">
            <div className="rounded-3xl border border-border/70 bg-card p-8 md:p-10">
              <WaitlistForm assetSlug="conception-grenada-resort" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
