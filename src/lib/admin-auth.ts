const BUILTIN_ADMIN_EMAILS = ["dlpwil2007@gmail.com"];

function getAdminEmails(): string[] {
  const fromEnv = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  return [...new Set([...BUILTIN_ADMIN_EMAILS.map((e) => e.toLowerCase()), ...fromEnv])];
}

export function isAdminEmail(email: string | undefined | null): boolean {
  if (!email) return false;
  return getAdminEmails().includes(email.trim().toLowerCase());
}
