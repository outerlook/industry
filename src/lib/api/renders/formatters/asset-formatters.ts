import { scalarFormatters } from "@/lib/api/renders/text";
import { flow } from "effect";
import * as O from "fp-ts/Option";
import { Lens } from "monocle-ts";
import type { validTypes } from "@/lib/io-ts/valid-types";
import type { FormatterRecord } from "@/lib/api/renders/formatters/generic";
import * as NEA from "fp-ts/NonEmptyArray";

type FormatFn<T> = (a: T) => string;

const assetLens = Lens.fromPath<validTypes["Asset"]>();

const mapTransform =
  <T>(transformers: Array<FormatFn<T>>) =>
  (a: T) =>
    transformers.map((t) => t(a));

/**
 * [First sensor name] +[n] if there are more than 1 sensors
 * "-" if there are no sensors
 */
const sensorsValueFormatter = flow(
  assetLens(["sensors"]).get,
  NEA.fromArray, // non empty array conversion, so head will be typesafe
  O.map(
    mapTransform([ // it uses 2 transformers, and at end we will join them
      flow(NEA.head, scalarFormatters.String),
      flow(
        (a) => a.length,
        O.fromPredicate((n) => n > 1), // if there are more than 1 sensors, lets add the count
        O.fold(
          () => "",
          (p) => ` +${p - 1}`
        )
      ),
    ])
  ),
  O.map((a) => a.join("")),
  O.getOrElse(() => "-") // no sensors
);

const valueFormatters = {
  name: flow(assetLens(["name"]).get, scalarFormatters.String),
  model: flow(assetLens(["model"]).get, scalarFormatters.String),
  sensors: sensorsValueFormatter,
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
  sensors: keyToAssetFormatter("sensors"),
  maxTemp: keyToAssetFormatter("maxTemp"),
  rpm: keyToAssetFormatter("rpm"),
  power: keyToAssetFormatter("power"),
} as const satisfies Record<
  keyof typeof valueFormatters,
  FormatterRecord<validTypes["Asset"]>
>;
