import type {Observable} from "rxjs";
import {filter, fromEvent, switchMap, tap} from "rxjs";

export const blurOnEscFromElement = (el$: Observable<HTMLInputElement>) => {
  return el$.pipe(
    switchMap((el) => fromEvent(el, "keydown")),
    filter((e) => "key" in e && e.key === "Escape"),
    tap((e) => {
      if ("target" in e) {
        const target = e.target as HTMLInputElement;
        target.blur();
      }
    })
  );
};
