import { CenteredLayout } from "../../layouts/CenteredLayout";
import { BasePanel } from "../../panels/BasePanel";
import { WidgetServicoLink } from "../../common/widgets/WidgetServicoLink";
import { List } from "antd";
import { LinksExternosWidget } from "./LinksExternosWidget";
import { servicesList } from "@/ui/components/common/servicos/services-list";

export const RootPage = () => {
  return (
    <CenteredLayout>
      <BasePanel span={12} titulo={"Last visited"}>
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
      <BasePanel span={12} titulo={"General status"} />
      <BasePanel span={12} titulo={"Work Orders"} />
      <BasePanel span={6} titulo={"External links"}>
        <LinksExternosWidget />
      </BasePanel>
      <BasePanel span={6} titulo={"More"} />
    </CenteredLayout>
  );
};
