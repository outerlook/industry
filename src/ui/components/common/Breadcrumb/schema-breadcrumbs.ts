import { linkTo } from "../../../../meta/__GENERATED__/routes";
import type { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import type { validTypes } from "../../../../lib/io-ts/valid-types";

// change proof
export type BreadcrumbItem = ItemType;

const forCompanies = ({ company }: { company: validTypes["Company"] }) => {
  return [
    { title: "Companies", href: linkTo["/companies"]({}) },
    {
      title: company.name,
      href: linkTo["/companies/:id"]({ id: company.id.toString() }),
    },
  ];
};

const forUnits = ({
  unit,
  ...rest
}: { unit: validTypes["Unit"] } & Parameters<typeof forCompanies>[0]) => {
  return [
    ...forCompanies(rest),
    { title: "Units", href: linkTo["/units"]({}) },
    {
      title: unit.name,
      href: linkTo["/units/:id"]({ id: unit.id.toString() }),
    },
  ];
};

const forAssets = ({
  asset,
  ...rest
}: { asset: validTypes["Asset"] } & Parameters<typeof forUnits>[0]) => {
  return [
    ...forUnits(rest),
    { title: "Assets", href: linkTo["/assets"]({}) },
    {
      title: asset.name,
      href: linkTo["/assets/:id"]({ id: asset.id.toString() }),
    },
  ];
};

const forUsers = ({
  user,
  ...rest
}: { user: validTypes["User"] } & Parameters<typeof forUnits>[0]) => {
  return [
    ...forUnits(rest),
    { title: "Users", href: linkTo["/users"]({}) },
    {
      title: user.name,
      href: linkTo["/users/:id"]({ id: user.id.toString() }),
    },
  ];
};

const forWorkorders = ({
  workorder,
  ...rest
}: {
  workorder: validTypes["Workorder"];
} & Parameters<typeof forAssets>[0]) => {
  return [
    ...forAssets(rest),
    { title: "Workorders", href: linkTo["/workorders"]({}) },
    {
      title: workorder.title,
      href: linkTo["/workorders/:id"]({ id: workorder.id.toString() }),
    },
  ];
};

export const getBreadcrumb = {
  forCompanies,
  forUnits,
  forAssets,
  forUsers,
  forWorkorders,
};
