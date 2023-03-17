import {TablePanel} from "@ui/components/panels/table/TablePanel";
import type * as t from "io-ts";
import type {apiTypes} from "@services/api/validation/api-types";
import type {Action} from "@ui/components/common/ActionButtons";
import {getBreadcrumb} from "@ui/components/common/Breadcrumb/schema-breadcrumbs";
import {EntityHeader} from "@ui/components/common/EntityHeader";
import {WidgetPresentation} from "@ui/components/widgets/generic-entities/WidgetPresentation";
import {EntityLayout} from "@ui/components/layouts/EntityLayout";
import {BasePanel} from "@ui/components/panels/BasePanel";
import {notImplementedHalMsg} from "@lib/utils/not-implemented";
import {pickAssetColumns} from "../../lib/entities/table/entity-columns/asset-columns";

type Props = {
  company: t.TypeOf<typeof apiTypes.Company>;
  units: t.TypeOf<typeof apiTypes.Unit>[];
  assets: t.TypeOf<typeof apiTypes.Asset>[];
};



export const CompanyContent = (props: Props) => {
  const { company, assets } = props;

  const actions = [
    {
      label: "edit",
      onClick: notImplementedHalMsg("edit"),
    },
    { label: "delete", onClick: notImplementedHalMsg("delete") },
    { label: "share", onClick: notImplementedHalMsg("share") },
    { label: "other", onClick: notImplementedHalMsg("other") },
  ] satisfies Action[];

  const breadcrumbItems = getBreadcrumb.forCompanies({
    company,
  });

  return (
    <EntityLayout
      siderChildren={
        <>
          <WidgetPresentation title={company.name} />
        </>
      }
    >
      <EntityHeader
        breadcrumbProps={{ items: breadcrumbItems }}
        actions={actions}
        title={company.name}
      />
      <TablePanel title={"Assets"} tableProps={{columns: pickAssetColumns(), dataSource: assets}} />
      <BasePanel title="Painel">
        <p>Conteúdo do painel</p>
      </BasePanel>
      <BasePanel title="Painel">
        <p>Conteúdo do painel</p>
      </BasePanel>
      <BasePanel title="Painel">
        <p>Conteúdo do painel</p>
      </BasePanel>
    </EntityLayout>
  );
};
