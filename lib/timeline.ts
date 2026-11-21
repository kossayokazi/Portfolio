export const sortNewestFirst = <T extends { end: string }>(items: T[]): T[] =>
  [...items].sort((a, b) => b.end.localeCompare(a.end));