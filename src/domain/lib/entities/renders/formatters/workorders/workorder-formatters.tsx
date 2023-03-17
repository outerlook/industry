import { flow } from 'effect';
import { workordersFromPropLens } from '../../../lenses/props-lenses';
import {
  ArrayCountWidget,
  toPieChartByKey,
} from '@ui/components/widgets/from/arrays';
import { Lens } from 'monocle-ts';

type Props = { title: string } & InferLensType<typeof workordersFromPropLens>;
type InferLensType<T> = T extends Lens<infer S, any> ? S : never;

export const WorkordersCount = flow(
  Lens.fromProps<Props>()(['workorders', 'title']).get,
  v => ArrayCountWidget({ title: v.title, items: v.workorders })
);

export const WorkorderPizzaByStatus = flow(
  workordersFromPropLens.get,
  toPieChartByKey('status')
);
