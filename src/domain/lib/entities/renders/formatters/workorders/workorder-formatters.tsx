import {flow} from 'effect';
import {workordersFromPropLens} from "../../../lenses/props-lenses";
import {arrayToCountWidget, toPieChart} from "@ui/components/widgets/from/arrays";


export const WorkorderTotals = flow(
    workordersFromPropLens.get,
    arrayToCountWidget('Total')
);

export const WorkorderPizzaByStatus = flow(
    workordersFromPropLens.get,
    toPieChart('status')
)