import type * as t from "io-ts";
import type {apiTypes} from "@services/api/validation/api-types";
import type {Action} from "@ui/components/common/ActionButtons";
import {getBreadcrumb} from "@ui/components/common/Breadcrumb/schema-breadcrumbs";
import {EntityHeader} from "@ui/components/common/EntityHeader";
import {EntityLayout} from "@ui/components/layouts/EntityLayout";
import {BasePanel} from "@ui/components/panels/BasePanel";
import {WidgetPresentation} from "@ui/components/widgets/generic-entities/WidgetPresentation";
import {notImplementedHalMsg} from "@lib/utils/not-implemented";

type Props = {
  company: t.TypeOf<typeof apiTypes.Company>;
  unit: t.TypeOf<typeof apiTypes.Unit>;
};

export const UnitContent = (props: Props) => {
  const { company, unit } = props;

  const actions = [
    {
      label: "edit",
      onClick: notImplementedHalMsg("edit"),
    },
    { label: "delete", onClick: notImplementedHalMsg("delete") },
    { label: "share", onClick: notImplementedHalMsg("share") },
    { label: "other", onClick: notImplementedHalMsg("other") },
  ] satisfies Action[];

  const breadcrumbItems = getBreadcrumb.forUnits({
    company,
    unit,
  });

  return (
    <EntityLayout
      siderChildren={
        <>
          <WidgetPresentation title={unit.name} />
        </>
      }
    >
      <EntityHeader
        breadcrumbProps={{ items: breadcrumbItems }}
        actions={actions}
        title={unit.name}
      />
    </EntityLayout>
  );
};
