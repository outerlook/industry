import type { apiTypes } from "../../../lib/io-ts/api-types";
import type * as t from "io-ts";
import { EntityHeader } from "../common/EntityHeader";
import type { Action } from "../common/ActionButtons";
import { EntityLayout } from "../layouts/EntityLayout";
import { WidgetPresentation } from "../common/widgets/generic-entities/WidgetPresentation";
import { getBreadcrumb } from "../common/Breadcrumb/schema-breadcrumbs";
import { BasePanel } from "../panels/BasePanel";
import { getAlert } from "../../../lib/utils/get-alert";

type Props = {
  asset: t.TypeOf<typeof apiTypes.Asset>;
  unit: t.TypeOf<typeof apiTypes.Unit>;
  company: t.TypeOf<typeof apiTypes.Company>;
};

export const AssetContent = (props: Props) => {
  const { asset, unit, company } = props;

  const actions = [
    {
      label: "edit",
      onClick: getAlert("edit"),
    },
    { label: "delete", onClick: getAlert("delete") },
    { label: "share", onClick: getAlert("share") },
    { label: "other", onClick: getAlert("other") },
  ] satisfies Action[];

  const breadcrumbItems = getBreadcrumb.forAssets({
    asset,
    company,
    unit,
  });

  return (
    <EntityLayout
      siderChildren={
        <>
          <WidgetPresentation image={asset.image} title={asset.name} />
        </>
      }
    >
      <EntityHeader
        breadcrumbProps={{ items: breadcrumbItems }}
        actions={actions}
        title={asset.name}
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
