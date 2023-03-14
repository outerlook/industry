import { useAsset } from "@/lib/api/context/entities-context";
import { flow, pipe } from "effect";
import * as O from "fp-ts/Option";
import { BaseWidget } from "@/ui/components/common/widgets/BaseWidget";
import type { validTypes } from "@/lib/io-ts/valid-types";
import { AttributeWidget } from "@/ui/components/widgets/generic-entities/AttributeWidget";
import { scalarFormatters } from "@/lib/api/renders/text";
import * as E from "fp-ts/Either";
import { propOrDash } from "@/lib/utils/prop-or-dash";
import * as A from "fp-ts/Array";

type FormatFn<T, K extends keyof T> = (a: T[K]) => string;

type FormatterRec<T, K extends keyof T> = {
  label: FormatFn<T, K>;
  value: FormatFn<T, K>;
};

type FormatterDict<T> = {
  [key in keyof T]?: FormatterRec<T, key>[];
};

const formatters = {
  name: [{ label: () => "Name", value: scalarFormatters.String }],
  model: [{ label: () => "Model", value: scalarFormatters.String }],
  sensors: [
    {
      label: () => "Sensors",
      value: flow(
        A.head,
        O.getOrElse(() => "-")
      ),
    },
  ],
  specifications: [
    {
      label: () => "Max. Temp.",
      value: (v) => scalarFormatters.CelciusTemperature(v.maxTemp),
    },
    {
      label: () => "RPM",
      value: flow(propOrDash("rpm"), E.map(scalarFormatters.RPM), E.toUnion),
    },
    {
      label: () => "HP",
      value: flow(
        propOrDash("power"),
        E.map(scalarFormatters.Power),
        E.toUnion
      ),
    },
  ],
} satisfies FormatterDict<validTypes["Asset"]>;

const getAssetAttributeRecords =
  (asset: validTypes["Asset"]) =>
  (keys: ReadonlyArray<keyof typeof formatters>) => {
    return keys.flatMap((k) =>
      formatters[k].map((f) => ({
        value: f.value(asset[k]),
        label: f.label(asset[k]),
      }))
    );
  };

export const AssetAttributes = () => {
  const [asset] = useAsset();

  const attributeKeys = ["name", "model", "sensors", "specifications"] as const;
  const optionAsset = O.fromNullable(asset);

  const attributesArg = pipe(
    optionAsset,
    O.map(getAssetAttributeRecords),
    O.map((v) => v(attributeKeys)),
    O.getOrElseW((): never[] => [])
  );

  return (
    <BaseWidget>
      {attributesArg.map(({ label, value }) => (
        <AttributeWidget
          colProps={{ span: 12 }}
          key={value}
          label={label}
          value={value}
        />
      ))}
    </BaseWidget>
  );
};
