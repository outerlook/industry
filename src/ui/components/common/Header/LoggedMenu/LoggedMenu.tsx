import {LoggedDropdown} from "@/ui/components/common/Header/LoggedMenu/LoggedDropdown";
import {Button} from "antd";
import {UserOutlined} from "@ant-design/icons";

export const LoggedMenu = () => {
  return (
    <LoggedDropdown>
      <Button
        className={"bg-slate-600 text-white"}
        shape={"circle"}
        icon={<UserOutlined />}
      ></Button>
    </LoggedDropdown>
  );
};
