export type ArchiveEntry = {
  id: string;
  code: string;
  year: string;
  status: "OPEN" | "RESTRICTED" | "ARCHIVED" | "CLOSED";
  href?: string;
};

/** Real + placeholder archive rows — no fake past purchasable collections */
export const archiveEntries: ArchiveEntry[] = [
  {
    id: "001",
    code: "NOVA",
    year: "2026",
    status: "OPEN",
    href: "/001/",
  },
  {
    id: "002",
    code: "—",
    year: "—",
    status: "RESTRICTED",
  },
  {
    id: "000",
    code: "STUDIO RECORD",
    year: "—",
    status: "ARCHIVED",
    href: "/record/",
  },
];
