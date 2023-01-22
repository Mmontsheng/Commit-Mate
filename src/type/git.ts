interface Error {
  error: string | null;
}
export interface Commit extends Error {
  response: string | null;
}

export interface Diff extends Error {
  changes: string | null;
}

export interface Branch extends Error{
  name: string | null
}