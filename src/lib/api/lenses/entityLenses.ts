import {Lens} from "monocle-ts";
import {validTypes} from "@/lib/io-ts/valid-types";

export const assetLens = Lens.fromPath<validTypes["Asset"]>();
export const workorderLens = Lens.fromPath<validTypes["Workorder"]>();
export const companyLens = Lens.fromPath<validTypes["Company"]>();