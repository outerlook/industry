import {useAsset} from "@/lib/api/context/entities-context";
import {pipe} from "effect";
import * as O from "fp-ts/Option";
import {BaseWidget} from "@/ui/components/common/widgets/BaseWidget";
import {AttributeWidget} from "@/ui/components/widgets/generic-entities/AttributeWidget";
import {assetFormatters} from "@/lib/api/renders/formatters/asset-formatters";
import {getAttributeRecords} from "@/lib/api/renders/formatters/generic";

const getAssetAttributeRecords = getAttributeRecords(assetFormatters);

export const AssetAttributes = () => {
  const [asset] = useAsset();

  const optionAsset = O.fromNullable(asset);

  const attributesArg = pipe(
    optionAsset,
    O.map(
      getAssetAttributeRecords([
        "name",
        "model",
        "sensors",
        "rpm",
        "maxTemp",
        "power",
      ])
    ),
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
