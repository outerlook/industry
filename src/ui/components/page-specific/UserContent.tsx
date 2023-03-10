import type * as t from "io-ts";
import type {apiTypes} from "../../../lib/io-ts/api-types";
import {getAlert} from "../../../lib/utils/get-alert";
import type {Action} from "../common/ActionButtons";
import {getBreadcrumb} from "../common/Breadcrumb/schema-breadcrumbs";
import {EntityHeader} from "../common/EntityHeader";
import {EntityLayout} from "../layouts/EntityLayout";
import {BasePanel} from "../panels/BasePanel";
import {WidgetPresentation} from "../widgets/generic-entities/WidgetPresentation";

type Props = {
  company: t.TypeOf<typeof apiTypes.Company>;
  unit: t.TypeOf<typeof apiTypes.Unit>;
  user: t.TypeOf<typeof apiTypes.User>;
};

export const UserContent = (props: Props) => {
  const { company, unit, user } = props;

  const actions = [
    {
      label: "edit",
      onClick: getAlert("edit"),
    },
    { label: "delete", onClick: getAlert("delete") },
    { label: "share", onClick: getAlert("share") },
    { label: "other", onClick: getAlert("other") },
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
