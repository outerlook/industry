import * as t from "io-ts";
import { apiTypes } from "@/lib/io-ts/api-types";
import { BasePanel } from "@/ui/components/panels/BasePanel";
import { BaseWidget } from "@/ui/components/common/widgets/BaseWidget";
import { NotImplementedChart } from "@/ui/components/common/widgets/NotImplementedChart";
import { Button, Row, Space } from "antd";
import { notImplementedHalMsg } from "@/lib/utils/not-implemented";
import { WorkorderTag } from "@/ui/components/common/widgets/workorder/WorkorderTag";

export function AssetContentBody(props: {
  workorders: t.TypeOf<typeof apiTypes.Workorder>[];
}) {
  const { workorders } = props;

  return (
    <Space size={"large"} className={"w-full"} direction={"vertical"}>
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
          <Row align={"middle"} justify={"space-between"}>
            <div>Work orders</div>
            <Button
              onClick={notImplementedHalMsg("add a work order")}
              type={"link"}
            >
              Add
            </Button>
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
    </Space>
  );
}
