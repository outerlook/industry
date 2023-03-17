import {Lens} from "monocle-ts";
import {validTypes} from "@services/api/validation/valid-types";

export const workordersFromPropLens = Lens.fromProp<{
    workorders: validTypes['Workorder'][];
}>()('workorders');