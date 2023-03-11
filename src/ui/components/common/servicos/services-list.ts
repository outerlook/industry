import { linkTo } from "@/meta/__GENERATED__/routes";
import { AimOutlined } from "@ant-design/icons";

export const servicesList = [
  {
    label: "Companies",
    href: linkTo["/companies"]({}),
    Icon: AimOutlined,
  },
  {
    label: "Units",
    href: linkTo["/units"]({}),
    Icon: AimOutlined,
  },
  {
    label: "Users",
    href: linkTo["/users"]({}),
    Icon: AimOutlined,
  },
  {
    label: "Assets",
    href: linkTo["/assets"]({}),
    Icon: AimOutlined,
  },
  {
    label: "Workorders",
    href: linkTo["/workorders"]({}),
    Icon: AimOutlined,
  },
] satisfies {
  label: string;
  href: string;
  Icon: React.FC;
}[];
