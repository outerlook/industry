import {pickAssetColumns} from "@/lib/api/table/columns";
import {TablePanel} from "@/ui/components/panels/table/TablePanel";
import type * as t from "io-ts";
import type {apiTypes} from "../../../lib/io-ts/api-types";
import type {Action} from "../common/ActionButtons";
import {getBreadcrumb} from "../common/Breadcrumb/schema-breadcrumbs";
import {EntityHeader} from "../common/EntityHeader";
import {WidgetPresentation} from "../common/widgets/generic-entities/WidgetPresentation";
import {EntityLayout} from "../layouts/EntityLayout";
import {BasePanel} from "../panels/BasePanel";
import {notImplementedHalMsg} from "@/lib/utils/not-implemented";

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
