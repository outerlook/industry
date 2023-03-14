import {expect, test} from "vitest";
import {assetFormatters} from "@/lib/api/renders/asset-formatters";
import type {validTypes} from "@/lib/io-ts/valid-types";

test('asset formatters work', () => {
    const assetWithMinimum = {
        specifications: {
            maxTemp: 3
        }
    } as validTypes["Asset"];

    expect(assetFormatters.rpm(assetWithMinimum).value).toEqual("-")
    expect(assetFormatters.maxTemp(assetWithMinimum).value).toEqual("3°C")
    expect(assetFormatters.power(assetWithMinimum).value).toEqual("-")

    const asset = {
        specifications: {
            rpm: 1,
            maxTemp: 3,
            power: 5
        }
    }  as validTypes["Asset"];
    expect(assetFormatters.rpm(asset).value).toEqual("1rpm")
    expect(assetFormatters.maxTemp(asset).value).toEqual("3°C")
    expect(assetFormatters.power(asset).value).toEqual("5W")

})