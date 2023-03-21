import type * as t from "io-ts";
import * as OE from "fp-ts-rxjs/ObservableEither";
import * as A from "fp-ts/Array";
import type {apiTypes} from "@services/api/validation/api-types";
import type {Action} from "@ui/components/common/ActionButtons";
import {getBreadcrumb} from "@ui/components/common/Breadcrumb/schema-breadcrumbs";
import {EntityHeader} from "@ui/components/common/EntityHeader";
import {EntityLayout} from "@ui/components/layouts/EntityLayout";
import {BasePanel} from "@ui/components/panels/BasePanel";
import {WidgetPresentation} from "@ui/components/widgets/generic-entities/WidgetPresentation";
import {notImplementedHalMsg} from "@lib/utils/not-implemented";
import {WorkorderTag} from "@ui/components/widgets/workorder/WorkorderTag";
import {useObservable} from "@lib/rxjs/use-observable";
import {pipe} from "effect";
import {fromUser} from "@services/api/entity-access/relations/from-entity/from-user";

type Props = {
  company: t.TypeOf<typeof apiTypes.Company>;
  unit: t.TypeOf<typeof apiTypes.Unit>;
  user: t.TypeOf<typeof apiTypes.User>;
};

export const UserContent = (props: Props) => {
  const { company, unit, user } = props;

  const workorders = useObservable(
      pipe(
          user,
          fromUser.workorder,
          OE.getOrElse(() => [] as never)
      )
  ) ?? []


  const actions = [
    {
      label: "edit",
      onClick: notImplementedHalMsg("edit"),
    },
    { label: "delete", onClick: notImplementedHalMsg("delete") },
    { label: "share", onClick: notImplementedHalMsg("share") },
    { label: "other", onClick: notImplementedHalMsg("other") },
  ] satisfies Action[];

  const breadcrumbItems = getBreadcrumb.forUsers({
    company,
    unit,
    user,
  });

  return (
    <EntityLayout
      siderChildren={
        <>
          <WidgetPresentation title={user.name} />
        </>
      }
    >
      <EntityHeader
        breadcrumbProps={{ items: breadcrumbItems }}
        actions={actions}
        title={user.name}
      />
      <BasePanel title="Work orders">
        {workorders.length > 0 ? (
            workorders.map(workorder => (
                <WorkorderTag key={workorder.id} workorder={workorder} />
            ))
        ) : (
            <div>No registered work orders for this user</div>
        )}
      </BasePanel>
    </EntityLayout>
  );
};
