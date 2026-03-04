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
  rose: "from-[#1a0b10] via-[#2a0f18] to-[#bd1640]",
  slate: "from-[#0a0b10] via-[#12141f] to-[#1b1d2a]",
  ember: "from-[#0c0b0b] via-[#1a0f0f] to-[#402122]",
  ivory: "from-[#1a1a1a] via-[#222] to-[#2b2b2b]",
};
