import {expect, test} from "vitest";
import {scalarFormatters} from "../text";
import {customScalars} from "@services/api/validation/api-types";

test("renders text", () => {
  const val = customScalars.CelciusTemperature.decode(1);
  if (val._tag === "Left") {
    throw new Error("Failed to decode");
  }

  const formatted = scalarFormatters.CelciusTemperature(val.right);
  expect(formatted).toEqual("1°C");
});
