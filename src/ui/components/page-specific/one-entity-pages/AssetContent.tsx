import type { apiTypes } from "src/lib/io-ts/api-types";
import type * as t from "io-ts";
import { EntityHeader } from "src/ui/components/common/EntityHeader";
import type { Action } from "src/ui/components/common/ActionButtons";
import { EntityLayout } from "src/ui/components/layouts/EntityLayout";
import { WidgetPresentation } from "src/ui/components/common/widgets/generic-entities/WidgetPresentation";
import { getBreadcrumb } from "src/ui/components/common/Breadcrumb/schema-breadcrumbs";
import { BasePanel } from "src/ui/components/panels/BasePanel";
import { notImplementedHalMsg } from "@/lib/utils/not-implemented";
import { AssetAttributes } from "@/ui/components/widgets/asset-widgets/AssetAttributes";
import {
  useAsset,
  WithAssetProvider,
} from "@/lib/api/context/entities-context";
import React from "react";
import { Divider, Space } from "antd";

type Props = {
  asset: t.TypeOf<typeof apiTypes.Asset>;
  unit: t.TypeOf<typeof apiTypes.Unit>;
  company: t.TypeOf<typeof apiTypes.Company>;
};

export const AssetContent = WithAssetProvider((props: Props) => {
  const { asset, unit, company } = props;

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
    <EntityLayout
      siderChildren={
        <Space direction={"vertical"}>
          <WidgetPresentation image={asset.image} title={asset.name} />
          <Divider orientation={"left"}>Attributes</Divider>
          <AssetAttributes />
        </Space>
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
});
