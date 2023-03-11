import { pipe } from "effect";
import { $api } from "@/lib/api/fetch/rxjs-api";
import * as OE from "fp-ts-rxjs/ObservableEither";
import { apply } from "fp-ts";

export const allObjects$ = () =>
  pipe(
    // fetch in parallel
    apply.sequenceT(OE.observableEither)(
      $api.Company.all(),
      $api.Unit.all(),
      $api.Asset.all(),
      $api.WorkOrder.all(),
      $api.User.all()
    ),
    OE.map(([companies, units, assets, workorders, users]) => ({
      companies,
      units,
      assets,
      workorders,
      users,
    }))
  );
