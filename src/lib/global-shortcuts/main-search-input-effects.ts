import {BehaviorSubject, filter, merge} from "rxjs";
import {blurOnEscFromElement} from "../rxjs/blur-on-esc";
import {clearOnBlurFromElement} from "../rxjs/clear-on-blur";
import {focusOnShortcutFromElement} from "../rxjs/focus-on-shortcut";

type PossibleElement = HTMLInputElement | null | undefined;
export const getMainSearchInputEffects = () => {
  const maybeEl$ = new BehaviorSubject<PossibleElement>(null);
  const shortcut = "Alt+/";
  const registerEl = (el: PossibleElement) => maybeEl$.next(el);

  const el$ = maybeEl$.pipe(filter(Boolean));
  const blurOnEsc$ = blurOnEscFromElement(el$);
  const clearOnBlur$ = clearOnBlurFromElement(el$);
  const focusOnShortcut$ = focusOnShortcutFromElement(el$, shortcut);

  const activate$ = merge(blurOnEsc$, clearOnBlur$, focusOnShortcut$);

  return {
    registerEl,
    activate$,
    shortcut,
  };
};
