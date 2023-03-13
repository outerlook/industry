import {expect, test} from "vitest";
import {getFormattedScalar} from "@/lib/api/renders/text";
import {apiTypes, customScalars} from "@/lib/io-ts/api-types";
import * as t from 'io-ts'
import {iso, Newtype} from "newtype-ts";

test("renders text", () => {
    const val = customScalars.CelciusTemperature.decode(1)
    if (val._tag === "Left") {
        throw new Error("Failed to decode")
    }

    const formatted = getFormattedScalar(val.right);
    expect(formatted).toEqual("1°C");
})