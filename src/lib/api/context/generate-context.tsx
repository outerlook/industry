import constate from 'constate'
import {useState} from "react";


const useEntity = <Entity extends any>() => {
    const [entity, setEntity] = useState<Entity>()
    return [entity, setEntity] as const
}

export const generateContext = <Entity extends any>() => {
    const [Provider, useThing] = constate(useEntity<Entity>);
    const WithProvider = <Props extends any>(C: React.FC<Props>) => (props: Props) => <Provider><C {...props}/></Provider> as unknown as typeof C
    return [Provider, useThing, WithProvider] as const;
}