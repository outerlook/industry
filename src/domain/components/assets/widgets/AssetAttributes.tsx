import {useAsset} from '../../../lib/entities/context/entities-context';
import {pipe} from 'effect';
import * as O from 'fp-ts/Option';
import {BaseWidget} from '@ui/components/widgets/BaseWidget';
import {AttributeWidget,} from '@ui/components/widgets/AttributeWidget';
import {assetFormatters} from '../../../lib/entities/renders/formatters/asset-formatters';
import {getAttributeRecords} from '../../../lib/entities/renders/formatters/generic';
import {SiderAttributes} from "@ui/components/common/SiderAttributes";

const getAssetAttributeRecords = getAttributeRecords(assetFormatters);

export const AssetAttributes = () => {
  const [asset] = useAsset();

  const optionAsset = O.fromNullable(asset);

  const attributesArg = pipe(
    optionAsset,
    O.map(
      getAssetAttributeRecords([
        'name',
        'model',
        'sensors',
        'rpm',
        'maxTemp',
        'power',
      ])
    ),
    O.getOrElseW((): never[] => [])
  );

  return (
      <SiderAttributes attributes={attributesArg}/>
  );
};

