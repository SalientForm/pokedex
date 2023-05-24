export interface PokeApiListResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T | null;
}
