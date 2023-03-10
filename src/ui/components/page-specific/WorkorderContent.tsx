import type * as t from "io-ts";
import type { apiTypes } from "../../../lib/io-ts/api-types";
import { getAlert } from "../../../lib/utils/get-alert";
import type { Action } from "../common/ActionButtons";
import { getBreadcrumb } from "../common/Breadcrumb/schema-breadcrumbs";
import { EntityHeader } from "../common/EntityHeader";
import { EntityLayout } from "../layouts/EntityLayout";
import { BasePanel } from "../panels/BasePanel";
import { WidgetPresentation } from "../common/widgets/generic-entities/WidgetPresentation";

type Props = {
  company: t.TypeOf<typeof apiTypes.Company>;
  unit: t.TypeOf<typeof apiTypes.Unit>;
  workorder: t.TypeOf<typeof apiTypes.Workorder>;
  asset: t.TypeOf<typeof apiTypes.Asset>;
};

export const WorkorderContent = (props: Props) => {
  const { company, unit, asset, workorder } = props;

  const actions = [
    {
      label: "edit",
      onClick: getAlert("edit"),
    },
    { label: "delete", onClick: getAlert("delete") },
    { label: "share", onClick: getAlert("share") },
    { label: "other", onClick: getAlert("other") },
  ] satisfies Action[];

  const breadcrumbItems = getBreadcrumb.forWorkorders({
    asset,
    company,
    unit,
    workorder,
  });

  return (
    <EntityLayout
      siderChildren={
        <>
          <WidgetPresentation title={workorder.title} />
        </>
      }
    >
      <EntityHeader
        breadcrumbProps={{ items: breadcrumbItems }}
        actions={actions}
        title={workorder.title}
      />
      <BasePanel titulo="Painel">
        <p>Conteúdo do painel</p>
      </BasePanel>
      <BasePanel titulo="Painel">
        <p>Conteúdo do painel</p>
      </BasePanel>
      <BasePanel titulo="Painel">
        <p>Conteúdo do painel</p>
      </BasePanel>
    </EntityLayout>
  );
};
