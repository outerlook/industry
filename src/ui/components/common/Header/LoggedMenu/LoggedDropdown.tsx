import {Dropdown} from "antd";
import {notImplementedHalMsg} from "@/lib/utils/not-implemented";

export function LoggedDropdown(props: React.PropsWithChildren) {
  return (
    <Dropdown
        placement={"bottomRight"}
      menu={{

        items: [
          {
            label: "Logout",
            onClick: notImplementedHalMsg("logout"),
            key: "logout",
          },
        ],
      }}
    >
      {props.children}
    </Dropdown>
  );
}
