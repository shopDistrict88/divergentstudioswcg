export type Exhibition = {
  id: string;
  title: string;
  slug: string;
  meaning: string;
  statement: string[];
  year: string;
  status: "LIVE" | "ARCHIVED" | "LOCKED";
  edition: string;
};

export type ProductImage = {
  id: string;
  alt: string;
  tone: "rose" | "slate" | "ember" | "ivory";
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  details: {
    material: string;
    fit: string;
    weight: string;
    care: string;
  };
  images: ProductImage[];
  exhibitionId: string;
  tags: string[];
  type: "Hoodie" | "Pants" | "Accessory";
};

export type JournalPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
  body: string;
};

export const exhibitions: Exhibition[] = [
  {
    id: "nova",
    title: "EXHIBITION 001: NOVA",
    slug: "nova",
    meaning: "A new beginning. The first star of Divergent Studios.",
    statement: [
      "NOVA is the ignition of our studio language.",
      "It is a controlled spark—new textures, sharper silhouettes, and a luminous edge.",
      "Every piece is a fragment of a larger installation. Limited, deliberate, and fleeting.",
    ],
    year: "2026",
    status: "LIVE",
    edition: "Limited run. No restock.",
  },
];

export const products: Product[] = [
  {
    id: "nova-hoodie",
    name: "NOVA RELIC HOODIE",
    slug: "nova-relic-hoodie",
    price: 165,
    description:
      "A sculpted heavyweight hoodie with dimensional seams and an archival finish. Built to feel like a gallery artifact.",
    details: {
      material: "100% brushed cotton fleece",
      fit: "Oversized, dropped shoulder",
      weight: "520 GSM",
      care: "Cold wash, hang dry",
    },
    images: [
      { id: "hoodie-1", alt: "NOVA hoodie front", tone: "rose" },
      { id: "hoodie-2", alt: "NOVA hoodie back", tone: "slate" },
      { id: "hoodie-3", alt: "NOVA hoodie detail", tone: "ember" },
    ],
    exhibitionId: "nova",
    tags: ["LIMITED", "EXHIBITION 001", "NOVA"],
    type: "Hoodie",
  },
  {
    id: "nova-pants",
    name: "NOVA DRIFT PANTS",
    slug: "nova-drift-pants",
    price: 138,
    description:
      "Tapered utility trousers with a soft structure and gallery-grade drape. Built for movement through curated spaces.",
    details: {
      material: "Cotton nylon blend",
      fit: "Relaxed taper",
      weight: "390 GSM",
      care: "Cold wash, low tumble",
    },
    images: [
      { id: "pants-1", alt: "NOVA pants front", tone: "slate" },
      { id: "pants-2", alt: "NOVA pants back", tone: "ivory" },
      { id: "pants-3", alt: "NOVA pants detail", tone: "rose" },
    ],
    exhibitionId: "nova",
    tags: ["LIMITED", "EXHIBITION 001", "NOVA"],
    type: "Pants",
  },
  {
    id: "nova-accessory",
    name: "NOVA SIGNAL SCARF",
    slug: "nova-signal-scarf",
    price: 72,
    description:
      "An abstract knit accessory that reads like a gallery placard. Designed to punctuate the exhibition uniform.",
    details: {
      material: "Merino blend knit",
      fit: "One size",
      weight: "220 GSM",
      care: "Hand wash, lay flat",
    },
    images: [
      { id: "accessory-1", alt: "NOVA scarf", tone: "ember" },
      { id: "accessory-2", alt: "NOVA scarf detail", tone: "rose" },
      { id: "accessory-3", alt: "NOVA scarf drape", tone: "ivory" },
    ],
    exhibitionId: "nova",
    tags: ["LIMITED", "EXHIBITION 001", "NOVA"],
    type: "Accessory",
  },
];

export const journalPosts: JournalPost[] = [
  {
    id: "signal-in-the-noise",
    slug: "signal-in-the-noise",
    title: "Signal in the Noise",
    excerpt:
      "Designing silhouettes that feel like quiet statements inside a loud city.",
    date: "Feb 4, 2026",
    readingTime: "4 min read",
    tags: ["Studio Notes", "Process"],
    body:
      "NOVA began as a study in restraint. We mapped the quiet zones of a city and translated them into seams and voids.\n\nEach panel is placed to slow the eye, to create a pause in motion. We want every piece to feel like an installation that can move with you.\n\nThis is the first chapter of Divergent Studios. A subtle signal, tuned for those who notice.",
  },
  {
    id: "material-memory",
    slug: "material-memory",
    title: "Material Memory",
    excerpt: "Why heavyweight cotton changes the way a garment holds light.",
    date: "Feb 2, 2026",
    readingTime: "3 min read",
    tags: ["Materials"],
    body:
      "Fabric is memory. The heavier the cloth, the more it remembers each fold. We selected brushed fleece and structured blends to carry form without stiffness.\n\nThe result is a quiet architecture—a garment that stores the imprint of every day.",
  },
  {
    id: "plaque-language",
    slug: "plaque-language",
    title: "Plaque Language",
    excerpt: "Museum labels inspired the way we communicate every product story.",
    date: "Jan 29, 2026",
    readingTime: "5 min read",
    tags: ["Studio Notes", "Story"],
    body:
      "We treat every piece like a work of art. The plaque is not decoration—it is context.\n\nIn NOVA, each label is a quiet archive: edition, materials, and the feeling we want you to remember.",
  },
  {
    id: "light-study-01",
    slug: "light-study-01",
    title: "Light Study 01",
    excerpt: "Experimenting with dark palettes and deep rose highlights.",
    date: "Jan 22, 2026",
    readingTime: "2 min read",
    tags: ["Process"],
    body:
      "NOVA is built on black. But the accent—the rose—needed to feel like heat. We tested gradients, metal foils, and woven threads.\n\nThe final tone is a low ember: elegant, restrained, and unforgettable.",
  },
  {
    id: "studio-rituals",
    slug: "studio-rituals",
    title: "Studio Rituals",
    excerpt: "The routines that keep the studio in alignment.",
    date: "Jan 14, 2026",
    readingTime: "3 min read",
    tags: ["Studio Notes"],
    body:
      "We begin each day with silence. The studio is a gallery before it is a workshop.\n\nThat quiet informs the collection. We want every visitor to feel a shift when they step in.",
  },
];

export const productImageTones: Record<ProductImage["tone"], string> = {
  rose: "from-[#1a0b10] via-[#2a0f18] to-[#bd1640]",
  slate: "from-[#0a0b10] via-[#12141f] to-[#1b1d2a]",
  ember: "from-[#0c0b0b] via-[#1a0f0f] to-[#402122]",
  ivory: "from-[#1a1a1a] via-[#222] to-[#2b2b2b]",
};
