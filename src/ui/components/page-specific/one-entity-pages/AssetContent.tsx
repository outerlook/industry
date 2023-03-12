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
import { Button, Divider, Row, Space } from "antd";
import { renderStatus } from "@/lib/api/table/cells/renderers";
import { BaseWidget } from "@/ui/components/common/widgets/BaseWidget";
import { NotImplementedChart } from "@/ui/components/common/widgets/NotImplementedChart";
import { WorkorderTag } from "@/ui/components/common/widgets/workorder/WorkorderTag";

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
    <EntityLayout
      siderChildren={
        <Space direction={"vertical"}>
          <WidgetPresentation
            extra={renderStatus(asset.status)}
            image={asset.image}
            title={asset.name}
          ></WidgetPresentation>
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
      <BasePanel title="General health">
        <BaseWidget colProps={{ span: 12 }}>
          Something about uptime
          <NotImplementedChart title={"Uptime"} />
        </BaseWidget>
        <BaseWidget colProps={{ span: 12 }}>
          Something about status history
          <NotImplementedChart title={"Status"} />
        </BaseWidget>
      </BasePanel>
      <BasePanel
        title={
          <Row justify={"space-between"}>
            <div>Work orders</div>
            <Button onClick={notImplementedHalMsg('add a work order')} type={'link'}>Add</Button>
          </Row>
        }
      >
        <BaseWidget colProps={{ span: 12 }}>
          <BaseWidget>
            {workorders.length > 0 ? (
              workorders.map((workorder) => (
                <WorkorderTag key={workorder.id} workorder={workorder} />
              ))
            ) : (
              <div>No registered work orders for this asset</div>
            )}
          </BaseWidget>
        </BaseWidget>
      </BasePanel>
    </EntityLayout>
  );
});
