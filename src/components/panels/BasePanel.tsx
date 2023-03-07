import {Card} from "antd";


type BasePanelProps = {
    titulo: string;
    children: React.ReactNode;
}

// panel like aws
export const BasePanel = ({ titulo, children }: BasePanelProps) => {
    return (
        <Card title={titulo} bordered={false} style={{ width: 300 }}>
            {children}
        </Card>
    )
}