import {useAsset} from "@/lib/api/context/entities-context";
import {Divider, Space} from "antd";
import {WidgetPresentation} from "@/ui/components/common/widgets/generic-entities/WidgetPresentation";
import {renderStatus} from "@/lib/api/table/cells/renderers";
import {AssetAttributes} from "@/ui/components/widgets/asset-widgets/AssetAttributes";
import React from "react";

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