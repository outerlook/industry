import {Typography} from "antd";
import React from "react";

const {Title} = Typography;


export const PageTitle = ({children}: React.PropsWithChildren) => {
    return <Title level={1}>{children}</Title>;
};
