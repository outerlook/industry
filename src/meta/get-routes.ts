import * as path from "path";
import {pipe} from "effect";
import * as fs from "fs";
import {DIRNAME} from "./important-paths";

const PAGES_ROOT = path.join(DIRNAME, "../pages");
const filePathToRoute = (route: string): string => {
  // remove pages root
  const removePagesRoot = (path: string) => path.replace(PAGES_ROOT, "");
  // remove .astro extension
  const removeAstroExtension = (path: string) => path.replace(/\.astro$/, "");
  // remove index
  const removeIndex = (path: string) => path.replace(/\/index$/, "");

  // replace [id] with :id
  const replaceSquareBracketsWithColon = (path: string) =>
    path.replace(/\[([a-zA-Z0-9]+)\]/g, ":$1");

  // add leading slash
  const addLeadingSlash = (path: string) => `/${path}`;
  // remove double slashes
  const normalizePath = (path: string) => path.replace(/\/\//g, "/");

  return pipe(
    route,
    removePagesRoot,
    removeAstroExtension,
    removeIndex,
    replaceSquareBracketsWithColon,
    addLeadingSlash,
    normalizePath
  );
};

const getAllFilesInPath = (dirPath: string): string[] => {
  const filesAndDirectories = fs.readdirSync(dirPath);
  const files: string[] = [];

  filesAndDirectories.forEach((fileOrDirectory) => {
    if (fs.statSync(`${dirPath}/${fileOrDirectory}`).isDirectory()) {
      files.push(...getAllFilesInPath(`${dirPath}/${fileOrDirectory}`));
    } else {
      files.push(path.join(dirPath, "/", fileOrDirectory));
    }
  });

  return files;
};

/**
 * Read astro routes and transforms into an array of possible paths
 * Ex.
 * companies/index.astro
 * companies/[id].astro
 * help.astro
 * index.astro
 * ->
 * [
 *  "/companies",
 *  "/companies/[id]",
 *  "/help",
 *  "/"
 *  ]
 */
export const readRoutes = () => {
  const routes = [];
  const files = getAllFilesInPath(PAGES_ROOT);
  for (const file of files) {
    const route = filePathToRoute(file);
    routes.push(route);
  }

  return routes;
};

export const getRouteListStatement = (routes: string[]) => {
  return `export const routes = ${JSON.stringify(routes, null, 2)} as const`;
};
