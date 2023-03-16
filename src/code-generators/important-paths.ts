import * as path from "path";

// esm doesn't support __dirname
const FILENAME = new URL(import.meta.url).pathname;
export const DIRNAME = path.dirname(FILENAME);