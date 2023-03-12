import type { validTypes } from "@/lib/io-ts/valid-types";
import { Tag, Typography } from "antd";
import { pipe } from "effect";
import * as A from "fp-ts/Array";
import { entityConfig } from "@/lib/api/config";

export const WorkorderTag = (props: { workorder: validTypes["Workorder"] }) => {
  const { title, checklist, status } = props.workorder;

  const color = status === "completed" ? "green" : "yellow";
  const completedChecklistItems = pipe(
    checklist,
    A.filter((item) => item.completed)
  );
  const href = entityConfig.Workorder.toLink(props.workorder);

  const taskCountStr = `${completedChecklistItems.length}/${checklist.length}`;

  return (
    <a href={href}>
      <Tag className={"p-2"} color={color}>
        <Typography.Title level={5}>{title}</Typography.Title>
        <Typography.Text className={"text-slate-600"}>
          Done: {taskCountStr}
        </Typography.Text>
      </Tag>
    </a>
  );
};
