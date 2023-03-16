import {CenteredLayout} from "@ui/components/layouts/CenteredLayout";
import {BasePanel} from "@ui/components/panels/BasePanel";
import {WidgetServicoLink} from "@ui/components/common/widgets/WidgetServicoLink";
import {List} from "antd";
import {LinksExternosWidget} from "./LinksExternosWidget";
import {servicesList} from "../../lib/entities/services-list";

export const RootPage = () => {
  return (
    <CenteredLayout>
      <BasePanel span={12} title={"Last visited"}>
        <List
            // todo: make it really last visited localStorage or something
          dataSource={servicesList.map((p) => ({
            href: p.href,
            title: p.label,
            icon: <p.Icon />,
          }))}
          size={"small"}
          grid={{ column: 2 }}
          split={true}
          renderItem={(props) => (
            <List.Item>
              <WidgetServicoLink colProps={{ span: 12 }} {...props} />
            </List.Item>
          )}
        />
      </BasePanel>
      <BasePanel span={12} title={"General status"} />
      <BasePanel span={12} title={"Work Orders"} />
      <BasePanel span={6} title={"External links"}>
        <LinksExternosWidget />
      </BasePanel>
      <BasePanel span={6} title={"More"} />
    </CenteredLayout>
  );
};
