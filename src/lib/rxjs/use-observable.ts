import React from "react";
import type {Observable} from "rxjs";

export const useObservable = <T>(observable: Observable<T>) => {
  const [state, setState] = React.useState<T>();

  React.useEffect(() => {
    const sub = observable.subscribe(setState);
    return () => {
      sub.unsubscribe();
    };
  }, [observable]);

  // TODO: Could get fancier and return a loading state to leverage Suspense

  return state;
};
