import constate from 'constate';
import { useState } from 'react';

const useEntity = <Entity extends any>(props: { initialState?: Entity }) => {
  const [entity, setEntity] = useState<Entity | undefined>(props.initialState);
  return [entity, setEntity] as const;
};

export const generateContext = <Entity extends any>() => {
  const [Provider, useThing] = constate(useEntity<Entity>);
  const WithProvider =
    <Props extends any>(C: React.FC<Props>) =>
    (props: Props) =>
      (
        <Provider>
          {/*@ts-ignore WORKING Fixme*/}
          <C {...props} />
        </Provider>
      ) as unknown as typeof C;
  return [Provider, useThing, WithProvider] as const;
};
