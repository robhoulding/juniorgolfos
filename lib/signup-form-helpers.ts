export function familyNameToLastName(familyName: string): string {
  const cleaned = familyName
    .trim()
    .replace(/^(the\s+)/i, "")
    .replace(/\s+family$/i, "")
    .trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  return parts[parts.length - 1] ?? cleaned;
}

export function parentNameToLastName(parentName: string): string {
  const parts = parentName.trim().split(/\s+/).filter(Boolean);
  return parts[parts.length - 1] ?? "";
}

export function parsePlayerName(
  playerName: string,
  fallbackLastName: string,
): { first_name: string; last_name: string } {
  const parts = playerName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    throw new Error("Player name is required");
  }
  if (parts.length === 1) {
    const last = fallbackLastName.trim();
    if (!last) {
      throw new Error("Please include your player's last name");
    }
    return { first_name: parts[0], last_name: last };
  }
  return {
    first_name: parts[0],
    last_name: parts.slice(1).join(" "),
  };
}

export function ageToDateOfBirth(age: number): string {
  const n = Math.floor(age);
  if (!Number.isFinite(n) || n < 5 || n > 22) {
    throw new Error("Player age must be between 5 and 22");
  }
  const year = new Date().getFullYear() - n;
  return `${year}-06-15`;
}
