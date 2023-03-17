import {useAsset} from "../../../lib/entities/context/entities-context";
import {Divider, Space} from "antd";
import {WidgetPresentation} from "@ui/components/widgets/generic-entities/WidgetPresentation";
import {renderStatus} from "../../../lib/entities/table/cells/renderers";
import {AssetAttributes} from "../widgets/AssetAttributes";

export function AssetSider() {
    const [asset] = useAsset()

    if (!asset) return null; // todo load or suspense

    return <Space direction={"vertical"}>
        <WidgetPresentation
            extra={renderStatus(asset?.status)}
            image={asset?.image}
            title={asset?.name}
        ></WidgetPresentation>
        <Divider orientation={"left"}>Attributes</Divider>
        <AssetAttributes/>
    </Space>
}