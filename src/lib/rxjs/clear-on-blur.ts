import {fromEvent, Observable, switchMap, tap} from "rxjs";

export const clearOnBlurFromElement = (el$: Observable<HTMLInputElement>) => {
  return el$.pipe(
    switchMap((el) => fromEvent(el, "blur")),
    tap((e) => {
      if ("target" in e) {
        const target = e.target as HTMLInputElement;
        target.value = "";
      }
    })
  );
};
