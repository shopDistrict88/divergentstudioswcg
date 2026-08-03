/**
 * Studio-wide status, copy, and structured content.
 * Update here — components read from data, not hardcoded prose.
 */

export type StudioStatusItem = {
  label: string;
  value: string;
};

export type JournalPreviewEntry = {
  entryNumber: string;
  slug: string;
  title: string;
  date: string;
  category: string;
  accessLevel: "PUBLIC" | "PARTIAL" | "RESTRICTED";
  status?: string;
  layout: "standard" | "sketch" | "note" | "restricted";
};

export type ArchiveFilePreview = {
  archiveNumber: string;
  slug: string;
  name: string;
  developed: string;
  released: string;
  releasedPieces: number;
  prototypes: number;
  developmentFiles: number;
  status: string;
  href: string;
};

export type InsideStudioCategory = {
  id: string;
  label: string;
  headline: string;
  details: string[];
};

export const studioConfig = {
  location: "Raleigh, North Carolina",
  established: "2025",

  status: {
    items: [
      { label: "NOVA", value: "AVAILABLE" },
      { label: "ORDERS", value: "OPEN" },
      { label: "CURRENT PHASE", value: "DEVELOPMENT ACTIVE" },
      { label: "LATEST JOURNAL FILE", value: "021" },
    ] satisfies StudioStatusItem[],
  },

  collection: {
    statement: {
      exhibition: "EXHIBITION 001: NOVA",
      body: [
        "NOVA explores isolation, ambition, transformation,",
        "and the pressure of becoming something greater than",
        "the environment that produced you.",
        "",
        "Every garment was developed through repeated sampling,",
        "material testing, reconstruction, and revision.",
      ],
    },
    heroMeta: {
      pieces: "04 PIECES",
      production: "LIMITED PRODUCTION",
      shipping: "WORLDWIDE SHIPPING",
      file: "STUDIO FILE 001",
      released: "RELEASED 2026",
      status: "STATUS: ACTIVE",
    },
  },

  insideStudio: {
    categories: [
      {
        id: "material",
        label: "01 — MATERIAL",
        headline: "Fabric weight, wash, and surface.",
        details: [
          "450GSM French terry — primary body",
          "Ribbed cotton collar — 2×2",
          "Heavy garment wash — final pass",
          "Lining — brushed cotton twill",
        ],
      },
      {
        id: "fit",
        label: "02 — FIT",
        headline: "Silhouette through revision.",
        details: [
          "Early samples — oversized block",
          "Revised crop on hood body",
          "Stacked pant leg — 32\" inseam base",
          "Model fitting — size M reference",
        ],
      },
      {
        id: "construction",
        label: "03 — CONSTRUCTION",
        headline: "Seams, reinforcement, hardware.",
        details: [
          "Double-needle flatlock — side seams",
          "Reinforced pocket bags",
          "Hidden zip — interior stash",
          "Embroidered back mark — tonal thread",
        ],
      },
      {
        id: "finish",
        label: "04 — FINISH",
        headline: "Wash, distress, final color.",
        details: [
          "Wash test 04 — approved",
          "Surface treatment — enzyme softening",
          "Print test — rejected, embroidery only",
          "Final color — void black",
        ],
      },
      {
        id: "packaging",
        label: "05 — PACKAGING",
        headline: "Presentation and authentication.",
        details: [
          "Matte black garment bag",
          "Studio file insert — folded",
          "Authentication card — numbered",
          "Shipping box — unmarked exterior",
        ],
      },
    ] satisfies InsideStudioCategory[],
  },

  journalPreview: [
    {
      entryNumber: "021",
      slug: "exhibition-002-first-silhouettes",
      title: "EXHIBITION 002 — FIRST SILHOUETTES",
      date: "AUGUST 02, 2026",
      category: "DEVELOPMENT",
      accessLevel: "PARTIAL",
      layout: "sketch",
    },
    {
      entryNumber: "020",
      slug: "hood-still-isnt-right",
      title: "THE HOOD STILL ISN'T RIGHT.",
      date: "JULY 29, 2026",
      category: "NOTES",
      accessLevel: "PUBLIC",
      layout: "note",
    },
    {
      entryNumber: "019",
      slug: "fabric-test-04",
      title: "FABRIC TEST 04",
      date: "JULY 22, 2026",
      category: "MATERIALS",
      accessLevel: "PUBLIC",
      status: "REJECTED",
      layout: "standard",
    },
    {
      entryNumber: "018",
      slug: "untitled-object",
      title: "UNTITLED OBJECT",
      date: "JULY 14, 2026",
      category: "RESTRICTED",
      accessLevel: "RESTRICTED",
      layout: "restricted",
    },
  ] satisfies JournalPreviewEntry[],

  archivePreview: {
    archiveNumber: "001",
    slug: "nova",
    name: "NOVA",
    developed: "2025–2026",
    released: "2026",
    releasedPieces: 4,
    prototypes: 7,
    developmentFiles: 23,
    status: "ACTIVE ARCHIVE",
    href: "/archive/nova/",
  } satisfies ArchiveFilePreview,

  statement: {
    heading: "THE STUDIO",
    body: [
      "Divergent Studios is an independent clothing studio",
      "focused on intentional garments, limited production,",
      "and ideas that exist beyond seasonal trends.",
      "",
      "Nothing is released without purpose.",
      "Nothing is preserved by accident.",
    ],
    principles: [
      { num: "01", title: "DESIGN WITH INTENTION" },
      { num: "02", title: "BUILD WITHOUT COMPROMISE" },
      { num: "03", title: "RELEASE WITH PURPOSE" },
    ],
  },

  method: [
    "RESEARCH",
    "DESIGN",
    "SAMPLE",
    "TEST",
    "REVISE",
    "PRODUCE",
    "DOCUMENT",
    "RELEASE",
    "ARCHIVE",
  ],

  footer: {
    tagline: "INDEPENDENT CLOTHING STUDIO",
    currentExhibition: "001",
    studioStatus: "ACTIVE",
    orders: "OPEN",
  },
} as const;
