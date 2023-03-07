import { combineLatestWith, EMPTY, Observable, tap } from "rxjs";
import { fromElementKeyPress } from "../global-shortcuts/from-element-key-press";

export const focusOnShortcutFromElement = (el$: Observable<HTMLElement>, shortcut: string) => {
  const shortcutPress$ =
    // ssr ready
    typeof window !== "undefined"
      ? fromElementKeyPress(document, shortcut)
      : EMPTY;

  return el$.pipe(
    combineLatestWith(shortcutPress$),
    tap(([el]) => el.focus())
  );
};
