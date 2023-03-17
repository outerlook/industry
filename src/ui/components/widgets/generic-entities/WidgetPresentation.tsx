import {BaseWidget} from "../BaseWidget";
import {Image, Typography} from "antd";

/**
 * |``| Titulo
 * |__| Extra
 */
export const WidgetPresentation = (
  props: React.PropsWithChildren<{
    extra?: React.ReactNode;
    image?: string;
    title: string;
  }>
) => {
  return (
    <BaseWidget rowProps={{ gutter: 8 }}>
      {props.image && (
        <BaseWidget colProps={{ flex: "96px" }}>
          <Image
            className={"object-cover"}
            // TODO: Optimize image on server
            src={props.image}
            width={96}
            height={96}
          />
        </BaseWidget>
      )}
      <BaseWidget colProps={{ flex: 1 }}>
        <div className={"p-2"}>
          <Typography.Title level={3}>{props.title}</Typography.Title>
          <Typography.Text>{props.extra}</Typography.Text>
        </div>
      </BaseWidget>
    </BaseWidget>
  );
};
