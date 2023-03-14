import { scalarFormatters } from "@/lib/api/renders/text";
import { flow } from "effect";
import * as O from "fp-ts/Option";
import { Lens } from "monocle-ts";
import type { validTypes } from "@/lib/io-ts/valid-types";

type FormatFn<T> = (a: T) => string;

const assetLens = Lens.fromPath<validTypes["Asset"]>();

const fromTransformers =
  <T>(transformers: Array<FormatFn<T>>) =>
  (a: T) =>
    transformers.map((t) => t(a));

/**
 * [First sensor name] +[n] if there are more than 1 sensors
 */
const sensorsValueFormatter = flow(
  fromTransformers([
    flow(assetLens(["sensors", 0]).get, scalarFormatters.String),
    flow(
      assetLens(["sensors"]).get,
      (a) => a.length,
      O.fromPredicate((n) => n > 1),
      O.fold(
        () => "",
        (p) => ` +${p - 1}`
      )
    ),
  ]),
  (a) => a.join("")
);

// declare const fromTransformers: <T>(
//   transformers: Array<FormatFn<T>>
// ) => (a: T) => string[];

const valueFormatters = {
  name: flow(assetLens(["name"]).get, scalarFormatters.String),
  // model: [{ label: () => "Model", value: scalarFormatters.String }],
  model: flow(assetLens(["model"]).get, scalarFormatters.String),
  sensors: sensorsValueFormatter,
  // assetLens(["sensors", 0]).get, scalarFormatters.String
  maxTemp: flow(
    assetLens(["specifications", "maxTemp"]).get,
    scalarFormatters.CelciusTemperature
  ),
  rpm: flow(
    assetLens(["specifications", "rpm"]).get,
    O.fromNullable,
    O.fold(() => "-", scalarFormatters.RPM)
  ),
  power: flow(
    assetLens(["specifications", "power"]).get,
    O.fromNullable,
    O.fold(() => "-", scalarFormatters.Power)
  ),
} satisfies Record<string, FormatFn<validTypes["Asset"]>>;

const labelFormatters = {
  name: "Name",
  model: "Model",
  sensors: "Sensors",
  maxTemp: "Max Temp",
  rpm: "RPM",
  power: "Power",
} satisfies Record<keyof typeof valueFormatters, string>;

const keyToAssetFormatter =
  (key: keyof typeof valueFormatters) =>
  (
    v: validTypes["Asset"]
  ): {
    label: string;
    value: string;
  } => ({
    label: labelFormatters[key],
    value: valueFormatters[key](v),
  });

export const assetFormatters = {
  name: keyToAssetFormatter("name"),
  model: keyToAssetFormatter("model"),
  sensors: keyToAssetFormatter('sensors'),
  maxTemp: keyToAssetFormatter("maxTemp"),
  rpm: keyToAssetFormatter("rpm"),
  power: keyToAssetFormatter("power"),
} satisfies Record<
  keyof typeof valueFormatters,
  (v: validTypes["Asset"]) => {
    label: string;
    value: string;
  }
>;
