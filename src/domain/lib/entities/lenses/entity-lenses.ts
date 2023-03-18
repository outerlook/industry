import {Lens} from 'monocle-ts';
import type {validTypes} from "@services/api/validation/valid-types";

export const assetLens = Lens.fromPath<validTypes['Asset']>();
export const assetPropsLens = Lens.fromProps<validTypes['Asset']>();


export const workorderLens = Lens.fromPath<validTypes['Workorder']>();
export const companyLens = Lens.fromPath<validTypes['Company']>();
export const unitLens = Lens.fromPath<validTypes['Unit']>();
export const userLens = Lens.fromPath<validTypes['User']>();
