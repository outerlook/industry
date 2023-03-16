import {expect, test} from "vitest";
import {render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {useObservable} from "../../react-rxjs/use-observable";
import {getMainSearchInputEffects} from "../main-search-input-effects";

test("global-shortcuts", async () => {
  const ReactInputComponent = () => {
    const { activate$, registerEl } = getMainSearchInputEffects();

    useObservable(activate$);

    return <input ref={(r) => registerEl(r)} type="text" id="input1" />;
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
