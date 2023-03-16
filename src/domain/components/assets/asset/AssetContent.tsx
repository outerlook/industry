import type {apiTypes} from "@services/api/validation/api-types";
import type * as t from "io-ts";
import {EntityHeader} from "@ui/components/common/EntityHeader";
import type {Action} from "@ui/components/common/ActionButtons";
import {EntityLayout} from "@ui/components/layouts/EntityLayout";
import {getBreadcrumb} from "@ui/components/common/Breadcrumb/schema-breadcrumbs";
import {notImplementedHalMsg} from "@lib/utils/not-implemented";
import {useAsset, WithAssetProvider,} from "../../../lib/entities/context/entities-context";
import React from "react";
import {AssetSider} from "./AssetSider";
import {AssetContentBody} from "./AssetContentBody";

type Props = {
  asset: t.TypeOf<typeof apiTypes.Asset>;
  unit: t.TypeOf<typeof apiTypes.Unit>;
  company: t.TypeOf<typeof apiTypes.Company>;
  workorders: t.TypeOf<typeof apiTypes.Workorder>[];
};

export const AssetContent = WithAssetProvider((props: Props) => {
  const { asset, unit, company, workorders } = props;

  const [_, setAsset] = useAsset();

  React.useEffect(() => setAsset(asset), [setAsset, asset]);

  const actions = [
    {
      label: "edit",
      onClick: notImplementedHalMsg("edit"),
    },
    { label: "delete", onClick: notImplementedHalMsg("delete") },
    { label: "share", onClick: notImplementedHalMsg("share") },
    { label: "other", onClick: notImplementedHalMsg("other") },
  ] satisfies Action[];

  const breadcrumbItems = getBreadcrumb.forAssets({
    asset,
    company,
    unit,
  });

  return (
    <EntityLayout siderChildren={<AssetSider />}>
      <EntityHeader
        breadcrumbProps={{ items: breadcrumbItems }}
        actions={actions}
        title={asset.name}
      />
      <AssetContentBody workorders={workorders} />
    </EntityLayout>
  );
});
