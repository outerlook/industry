import {Observable} from "rxjs";
import * as tk from "tinykeys";

export const fromElementKeyPress = (
  el: HTMLElement | Document,
  keybinding: string
) =>
  new Observable<KeyboardEvent>((subscriber) => {
    const handler = tk.createKeybindingsHandler({
      [keybinding]: (event) => subscriber.next(event),
    });
    el.addEventListener("keydown", handler);
    return () => el.removeEventListener("keydown", handler);
  });
