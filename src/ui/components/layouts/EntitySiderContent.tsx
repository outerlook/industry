import { Menu } from "antd";
import { servicesList } from "@/ui/components/common/servicos/services-list";

export function EntitySiderContent() {
  let initialSelected =
    typeof window !== "undefined" ? window.location.pathname : "";
  return (
    <Menu
      defaultSelectedKeys={[initialSelected]}
      items={[
        { label: "Lists", type: "group", key: "services" },
        ...servicesList.map((s) => ({
          label: <a href={s.href}>{s.label}</a>,
          key: s.href,
          title: s.label,
          icon: <s.Icon />,
        })),
      ]}
    ></Menu>
  );
}
