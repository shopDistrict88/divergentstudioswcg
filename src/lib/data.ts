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
  src?: string; // Image URL — when set, displays actual image instead of gradient
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
  /** Admin catalog status when available from Supabase */
  status?: "active" | "draft" | "sold-out";
  /** Available sizes from catalog when present */
  sizes?: string[];
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

export const productImageTones: Record<ProductImage["tone"], string> = {
  rose: "from-[#0f0f0f] via-[#1a1a1a] to-[#262626]",
  slate: "from-[#000000] via-[#0f0f0f] to-[#1a1a1a]",
  ember: "from-[#0f0f0f] via-[#1a1a1a] to-[#262626]",
  ivory: "from-[#1a1a1a] via-[#262626] to-[#1a1a1a]",
};
