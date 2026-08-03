export type ArchiveEntry = {
  id: string;
  code: string;
  year: string;
  status: "OPEN" | "RESTRICTED" | "ARCHIVED" | "CLOSED" | "ACTIVE ARCHIVE";
  href?: string;
  type?: string;
  developed?: string;
  files?: number;
};

/** Archive index rows — update as collections are preserved */
export const archiveEntries: ArchiveEntry[] = [
  {
    id: "001",
    code: "NOVA",
    year: "2026",
    status: "ACTIVE ARCHIVE",
    href: "/archive/nova/",
    type: "EXHIBITION",
    developed: "2025–2026",
    files: 23,
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
    href: "/journal/",
  },
];

export const ARCHIVE_FILTERS = [
  "ALL FILES",
  "COLLECTIONS",
  "RELEASED PIECES",
  "PROTOTYPES",
  "UNRELEASED",
  "CAMPAIGNS",
  "DOCUMENTS",
  "REJECTED",
] as const;
