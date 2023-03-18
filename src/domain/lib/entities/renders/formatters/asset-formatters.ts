import { scalarFormatters } from '../text';
import { flow } from 'effect';
import * as O from 'fp-ts/Option';
import type { validTypes } from '@services/api/validation/valid-types';
import type { FormatterRecord } from './generic';
import * as NEA from 'fp-ts/NonEmptyArray';
import { assetLens, assetPropsLens } from '../../lenses/entity-lenses';
import { linkFromAsset } from '../../link-from';
import { toReactLink } from '../../table/cells/renderers';
import { applyFunctions } from '@lib/fp-ts/apply-functions';

type FormatFn<T> = (a: T) => React.ReactNode;

const mapTransform =
  <T>(transformers: Array<FormatFn<T>>) =>
  (a: T) =>
    transformers.map(t => t(a));

/**
 * [First sensor name] +[n] if there are more than 1 sensors
 * "-" if there are no sensors
 */
const sensorsValueFormatter = flow(
  assetLens(['sensors']).get,
  NEA.fromArray, // non empty array conversion, so head will be typesafe
  O.map(
    mapTransform([
      // it uses 2 transformers, and at end we will join them
      flow(NEA.head, scalarFormatters.String),
      flow(
        a => a.length,
        O.fromPredicate(n => n > 1), // if there are more than 1 sensors, lets add the count
        O.fold(
          () => '',
          p => ` +${p - 1}`
        )
      ),
    ])
  ),
  O.map(a => a.join('')),
  O.getOrElse(() => '-') // no sensors
);

const powerFormatter = flow(
  assetLens(['specifications', 'power']).get,
  O.fromNullable,
  O.fold(() => '-', scalarFormatters.Power)
);
const rpmFormatter = flow(
  assetLens(['specifications', 'rpm']).get,
  O.fromNullable,
  O.fold(() => '-', scalarFormatters.RPM)
);
const maxTempFormatter = flow(
  assetLens(['specifications', 'maxTemp']).get,
  scalarFormatters.CelciusTemperature
);

const valueFormatters = {
  name: flow(assetLens(['name']).get, scalarFormatters.String),
  nameLink: flow(
    assetPropsLens(['name', 'id']).get,
    linkFromAsset,
    toReactLink
  ),
  model: flow(assetLens(['model']).get, scalarFormatters.String),
  sensors: sensorsValueFormatter,
  maxTemp: maxTempFormatter,
  rpm: rpmFormatter,
  power: powerFormatter,
  aggregatedSpecifications: flow(
    applyFunctions(maxTempFormatter, rpmFormatter, powerFormatter),
    s => s.join(' / ')
  ),
} satisfies Record<string, FormatFn<validTypes['Asset']>>;

const labelFormatters = {
  name: 'Name',
  nameLink: 'Asset',
  model: 'Model',
  sensors: 'Sensors',
  maxTemp: 'Max Temp',
  rpm: 'RPM',
  power: 'Power',
  aggregatedSpecifications: 'Specifications',
} satisfies Partial<Record<keyof typeof valueFormatters, React.ReactNode>>;

const keyToAssetFormatter =
  (key: keyof typeof valueFormatters & keyof typeof labelFormatters) =>
  (
    v: validTypes['Asset']
  ): {
    label: string;
    value: React.ReactNode;
  } => ({
    label: labelFormatters[key],
    value: valueFormatters[key](v),
  });

export const assetFormatters = {
  name: keyToAssetFormatter('name'),
  nameLink: keyToAssetFormatter('nameLink'),
  model: keyToAssetFormatter('model'),
  sensors: keyToAssetFormatter('sensors'),
  maxTemp: keyToAssetFormatter('maxTemp'),
  rpm: keyToAssetFormatter('rpm'),
  power: keyToAssetFormatter('power'),
} as const satisfies Record<
  keyof typeof valueFormatters,
  FormatterRecord<validTypes['Asset']>
>;

export const assetValueFormatters = valueFormatters;
