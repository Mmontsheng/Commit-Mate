interface Error {
  error: string | null;
}
export interface Commit extends Error {
  response: string | null;
}

export interface Diffs extends Error {
  changes: string | null;
}
