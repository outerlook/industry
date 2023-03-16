export class FetchError extends Error {
  originalError: unknown;

  constructor(error: unknown) {
    const message = typeof error === "string" ? error : "Fetch error";
    super(message);
    this.originalError = error;
    this.name = "FetchError";
  }
}

export const toFetchError = (e: unknown) => new FetchError(e);
