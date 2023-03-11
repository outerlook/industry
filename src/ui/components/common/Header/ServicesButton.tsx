import {ServicesDropdown} from "@/ui/components/common/Header/ServicosDropdownContent";
import {Button} from "antd";
import {DoubleRightOutlined} from "@ant-design/icons";

export function ServicesButton() {
  return (
    <ServicesDropdown>
      <Button ghost icon={<DoubleRightOutlined />}>
        Services
      </Button>
    </ServicesDropdown>
  );
}
