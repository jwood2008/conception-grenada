import Image from "next/image";
import { CinematicHero } from "@/components/cinematic-hero";
import { WaitlistForm } from "@/components/waitlist-form";

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <About />
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
              Point Saline — fourteen villas, a wellness clinic, and a spa
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

        <div className="reveal-up-stagger mt-16 grid gap-6 md:grid-cols-3">
          {FEATURES.map((f) => (
            <article
              key={f.title}
              className="relative overflow-hidden rounded-3xl border border-border/70 bg-card"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={f.image}
                  alt={f.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <h3 className="font-display text-2xl font-medium text-white">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/85">
                    {f.body}
                  </p>
                </div>
              </div>
            </article>
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
  },
  {
    title: "Wellness clinic & spa",
    body:
      "On-site cosmetic surgery, recovery, and a full spa — the resort is designed around restoration.",
    image: "/images/villa-interior-living.png",
  },
  {
    title: "Point Saline coastline",
    body:
      "Eight acres of waterfront on Grenada's southern peninsula. Reef, sailboats, and the trade winds.",
    image: "/images/ocean-view-sailboats.png",
  },
];

/* --------------------------------- TEAM --------------------------------- */

const TEAM = [
  {
    name: "Gavin Stassen",
    role: "Founder",
    photo: "/images/team-gavin.png",
    bio: "Built private hospitals and wellness facilities for 35+ years. Co-founded the NetCare Hospital Group (now ZAR 22B+ on the JSE) and has designed or advised on more than 100 healthcare projects. Conception Grenada is his life's work brought to the Caribbean.",
  },
];

function Team() {
  return (
    <section
      id="team"
      className="relative scroll-mt-20 bg-secondary/40 py-24 md:scroll-mt-24 md:py-32"
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

        <div className="reveal-up-stagger mt-14 grid gap-6 md:grid-cols-2">
          {TEAM.map((m) => (
            <article
              key={m.name}
              className="flex flex-col gap-6 rounded-3xl border border-border/70 bg-card p-8 md:col-span-2 md:flex-row md:items-start md:p-10"
            >
              <div className="flex-none">
                <div className="relative h-24 w-24 overflow-hidden rounded-full bg-secondary ring-1 ring-border/70">
                  <Image
                    src={m.photo}
                    alt={m.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <h3 className="font-display text-2xl font-medium tracking-tight text-foreground">
                  {m.name}
                </h3>
                <p className="mt-1 font-sans text-base font-medium text-muted-foreground">
                  {m.role}
                </p>
                <p className="mt-4 font-sans text-base leading-relaxed text-muted-foreground">
                  {m.bio}
                </p>
              </div>
            </article>
          ))}

          <article className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-border/70 bg-card/40 p-10 text-center md:col-span-2">
            <span className="eyebrow">Coming soon</span>
            <p className="max-w-md font-sans text-base leading-relaxed text-muted-foreground">
              Lead clinician and on-site medical team — including the surgeon
              leading our cosmetic program — to be announced.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- INVEST -------------------------------- */

function Invest() {
  return (
    <section
      id="invest"
      className="relative scroll-mt-20 bg-secondary/40 py-20 md:scroll-mt-24 md:py-24"
    >
      <div className="container-prose">
        <div className="mx-auto max-w-3xl rounded-3xl border border-border/70 bg-card p-10 md:p-14">
          <span className="eyebrow">For investors</span>
          <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-foreground md:text-4xl">
            There&apos;s also an ownership opportunity.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            A limited number of accredited investors can own a tokenized stake
            in the underlying real estate. The offering is run separately,
            through TierraDex, with its own diligence and disclosures.
          </p>
          <a
            href="https://tierradex.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Investor details on TierraDex
          </a>
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
