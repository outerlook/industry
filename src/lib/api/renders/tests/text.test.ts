import { expect, test } from "vitest";
import {getFormattedScalar, scalarFormatters} from "@/lib/api/renders/text";
import { customScalars } from "@/lib/io-ts/api-types";

test("renders text", () => {
  const val = customScalars.CelciusTemperature.decode(1);
  if (val._tag === "Left") {
    throw new Error("Failed to decode");
  }

  const formatted = scalarFormatters.CelciusTemperature(val.right);
  expect(formatted).toEqual("1°C");
});
