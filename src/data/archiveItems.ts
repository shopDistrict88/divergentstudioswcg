export type ArchiveItem = {
  id: string;
  title: string;
  category: string;
  caption?: string;
  image?: string;
  tone?: "slate" | "ivory" | "ember" | "rose";
};

/** Behind-the-scenes archive — concepts, prototypes, tests */
export const archiveItems: ArchiveItem[] = [
  {
    id: "001",
    title: "Nova Hoodie — Prototype",
    category: "Sample Garment",
    caption: "First heavy-wash sample. Weight was wrong.",
    tone: "slate",
  },
  {
    id: "002",
    title: "Embroidery Test — Back Mark",
    category: "Embroidery Test",
    caption: "Thread density iteration 04.",
    tone: "ivory",
  },
  {
    id: "003",
    title: "Rejected Graphic — Type Study",
    category: "Rejected Graphic",
    caption: "Too loud. Discarded.",
    tone: "ember",
  },
  {
    id: "004",
    title: "Factory Floor — Wash Cycle",
    category: "Factory Photo",
    caption: "Heavy garment wash. Final pass.",
    tone: "slate",
  },
  {
    id: "005",
    title: "Notebook — Hood Construction",
    category: "Notebook Page",
    caption: "Double layer hood notes.",
    tone: "ivory",
  },
  {
    id: "006",
    title: "Packaging Concept — 001",
    category: "Packaging",
    caption: "Minimal black wrap. No branding outside.",
    tone: "slate",
  },
  {
    id: "007",
    title: "Fabric Swatch — 650 GSM",
    category: "Material",
    caption: "Final fleece weight approved.",
    tone: "ember",
  },
  {
    id: "008",
    title: "Handwritten Note — Wash Formula",
    category: "Handwritten Note",
    caption: "May 4 — finally found the right wash.",
    tone: "ivory",
  },
];
