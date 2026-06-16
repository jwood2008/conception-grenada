/**
 * Grenada asset content — values pulled from PPM Clean Draft 8.
 * Source of truth for offering economics, project description, management.
 * See CLAUDE.md "Content source-of-truth" for handling of PPM contradictions.
 */

export const grenada = {
  slug: "grenada",
  brandName: "Grenada Lifestyle Properties",
  projectName: "Grenada Lifestyle Clinic, Hotel & Spa",
  shortTagline: "A premier Caribbean health and lifestyle resort.",
  location: "Point Salines, St. George, Grenada",
  status: "Pre-construction · Land secured",

  videoId: "dJL5b5iCLuw",
  videoTitle: "The Grenada Lifestyle Clinic, Hotel & Spa — project flythrough",

  hero: {
    eyebrow: "Current opportunity",
    headline: "Own a stake in a premier Caribbean health resort.",
    subhead:
      "The Grenada Lifestyle Clinic combines cosmetic surgery, recovery hospitality, and luxury villas on 8.75 acres of waterfront in the Caribbean — open to accredited investors through tokenized Class B shares.",
  },

  offering: {
    structure: "Reg D 506(c)",
    securityType: "Class B Non-Voting Shares, tokenized",
    totalRaise: "$16,000,000",
    tokenSupply: "8,000,000",
    pricePerToken: "$2.00",
    minimumInvestment: "$4,000",
    targetYield: "5–8%",
    yieldCadence: "Quarterly distributions",
    lockup: "366 days",
    redemption: "None for 3 years from purchase",
    liquidationPreference: "1× over Class A",
    acceptedCurrencies: ["USD", "USDC", "USDT", "BTC", "ETH"],
    citizenshipHook: "Grenadian citizenship eligible at $220K+ via the CBI program",
    blockchain: "XRPL via TierraDex",
  },

  // Resort facilities — from PPM "The Resort" section
  facilities: [
    {
      name: "Cosmetic Surgery Clinic",
      detail: "26 beds · 3 fully equipped operating theatres",
      kicker: "Elective surgery for local + international patients",
    },
    {
      name: "Recovery Hotel",
      detail: "32 beds dedicated to surgical aftercare",
      kicker: "Calm, supervised recovery in resort surroundings",
    },
    {
      name: "Luxury Villas",
      detail: "14 villas with private pools",
      kicker: "VIP accommodation for patients + companions",
    },
    {
      name: "Executive Spa",
      detail: "Full-service spa and wellness",
      kicker: "Recovery, rejuvenation, retreat",
    },
    {
      name: "Eye Hospital",
      detail: "Specialty ophthalmology services",
      kicker: "Procedures, screening, and aftercare",
    },
    {
      name: "Aesthetic Dental Clinic",
      detail: "Cosmetic and restorative dentistry",
      kicker: "Smile design, implants, whitening",
    },
  ],

  // Why-this-project pillars
  thesis: [
    {
      title: "Medical tourism gateway",
      body:
        "Cosmetic surgery overseas is a multi-billion-dollar industry. Grenada offers political stability, English-speaking infrastructure, and proximity to North American patients.",
    },
    {
      title: "Citizenship-by-Investment route",
      body:
        "The Resort is being structured as an approved real-estate project under Grenada's CBI program. Investments at $220K+ may qualify for Grenadian citizenship — a passport with visa-free access to 140+ countries.",
    },
    {
      title: "Tax-friendly jurisdiction",
      body:
        "Grenada has no foreign income, wealth, gift, inheritance, or capital gains tax. Currency (XCD) is pegged to USD. Duty-free trading across the Caribbean.",
    },
    {
      title: "Experienced operators",
      body:
        "CEO Gavin Stassen previously co-founded the NetCare Hospital Group (JSE-listed, ZAR 22B+ market cap) and has 35+ years developing private hospitals across multiple jurisdictions.",
    },
  ],

  management: [
    {
      name: "Gavin Stassen",
      role: "CEO · Caribbean Investment Holdings",
      bio:
        "Private hospital developer, owner-operator, and consultant with 35+ years of experience. Co-founded NetCare Hospital Group with Dr Jack Shevel, culminating in the group's JSE listing (now ZAR 22B+ market cap). Has personally designed or advised on more than 100 healthcare facilities.",
      linkedin: "https://www.linkedin.com/in/gavin-stassen",
      headshot: "/images/management-gavin.png",
    },
    {
      name: "Hannes Lotz",
      role: "Director · Construction & Project Management",
      bio:
        "Construction and project management executive with 38+ years of experience including international assignments in Mozambique, the UAE, and the Caribbean. MBA (UNISA), B.Eng Mechanical (Pretoria), PMP, PrEng. Lived in Grenada for three years executing mega-projects — uniquely suited to lead this build.",
      linkedin: null,
      headshot: "/images/management-hannes.png",
    },
  ],

  // Construction + use of proceeds, from PPM
  build: {
    totalProjectCost: "$94,000,000",
    landSecured: "The Glade, Point Salines · 8.75 acres · $6,000,000",
    cihRaise: "$16,000,000 (this offering)",
    cbiAndOther: "Balance via CBI program funding + other commitments",
    timeline: "Construction expected to complete within 20 months of break-ground",
  },

  // Faqs — generated from PPM, plain language
  faqs: [
    {
      q: "Who can invest?",
      a: "Verified accredited investors as defined under Rule 501 of Regulation D of the U.S. Securities Act. Accreditation is verified by TierraDex during onboarding.",
    },
    {
      q: "How are the tokens issued?",
      a: "Tokenization is handled by TierraDex on the XRPL network. Each Class B token represents one Class B Non-Voting Share of Caribbean Investment Holdings LLC.",
    },
    {
      q: "When can I sell my tokens?",
      a: "Tokens are subject to a 366-day lockup from purchase and have no redemption rights for three years. Secondary transfers are restricted by U.S. and applicable foreign securities laws.",
    },
    {
      q: "How are distributions paid?",
      a: "The Board intends to distribute net profits quarterly in USD or accepted cryptocurrencies, once the Resort reaches stabilization. Target yield is 5–8% annually. Distributions are not guaranteed.",
    },
    {
      q: "What about Grenadian citizenship?",
      a: "Investments of $220,000 or more may qualify for Grenada's Citizenship by Investment program, subject to a $50,000 government fee, a 5-year hold, application via licensed agents, and government approval.",
    },
    {
      q: "What if you don't raise the full $16M?",
      a: "The offering is on a best-efforts basis. The Company may close the offering at its discretion once a minimum threshold is reached.",
    },
  ],

  // Caribbean / Grenada context tidbits
  countryFacts: [
    { label: "Population literacy", value: "98%+" },
    { label: "Universities", value: "St George's hosts 7,000+ students from 140 countries" },
    { label: "Visa-free travel", value: "140+ countries on a Grenadian passport" },
    { label: "Foreign income tax", value: "None" },
    { label: "Capital gains tax", value: "None" },
    { label: "Currency", value: "XCD pegged to USD" },
  ],
} as const;
