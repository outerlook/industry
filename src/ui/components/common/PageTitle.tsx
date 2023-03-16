import {Typography} from "antd";

const {Title} = Typography;


export const PageTitle = ({children}: React.PropsWithChildren) => {
    return <Title level={1}>{children}</Title>;
};
