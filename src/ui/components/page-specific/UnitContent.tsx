import type * as t from "io-ts";
import type {apiTypes} from "../../../lib/io-ts/api-types";
import type {Action} from "../common/ActionButtons";
import {getBreadcrumb} from "../common/Breadcrumb/schema-breadcrumbs";
import {EntityHeader} from "../common/EntityHeader";
import {EntityLayout} from "../layouts/EntityLayout";
import {BasePanel} from "../panels/BasePanel";
import {WidgetPresentation} from "../common/widgets/generic-entities/WidgetPresentation";
import {notImplementedHalMsg} from "@/lib/utils/not-implemented";

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
