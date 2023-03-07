import { getFocusSearchShortcut } from "../focus-search";
import { expect, test } from "vitest";
import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useObservable } from "../../react-rxjs/use-observable";

test("global-shortcuts", async () => {
  const ReactInputComponent = () => {
    const { activate$, registerInput } = getFocusSearchShortcut();

    useObservable(activate$);

    return <input ref={(r) => registerInput(r)} type="text" id="input1" />;
  };

  const app = render(
    <div>
      <ReactInputComponent />
    </div>
  );
  const input1 = app.container.querySelector("#input1") as HTMLInputElement;

  // press alt + /
  await userEvent.keyboard("{alt>}/{/alt}}");

  expect(input1).toHaveFocus();
});
