export class UnknownError extends Error {
    originalError: unknown;

    constructor(error: unknown) {
        if (typeof error === "string") {
            super(error);
        } else {
            super("Unknown error");
        }
        this.originalError = error;
        this.name = "UnknownError";
    }
}

export const toUnknownError = (e: unknown) => new UnknownError(e);