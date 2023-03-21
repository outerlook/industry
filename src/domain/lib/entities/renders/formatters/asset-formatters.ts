import {scalarFormatters} from '../text';
import * as E from 'fp-ts/Either';
import {flow} from 'effect';
import * as O from 'fp-ts/Option';
import type {validTypes} from '@services/api/validation/valid-types';
import type {FormatterRecord} from './generic';
import * as NEA from 'fp-ts/NonEmptyArray';
import {assetLens, assetPropsLens} from '../../lenses/entity-lenses';
import {linkFromAsset} from '../../link-from';
import {toReactLink} from '../../table/cells/renderers';
import {applyFunctions} from '@lib/fp-ts/apply-functions';
import * as A from 'fp-ts/Array';
import type {FormatFn} from "./types";

const orEmptyString = O.getOrElse(() => '-'); // isolating if we want to change the string later

/**
 * [First sensor name] +[n] if there are more than 1 sensors
 * "-" if there are no sensors
 */
const sensorsValueFormatter = flow(
    assetLens(['sensors']).get,
    NEA.fromArray, // non empty array conversion, so head will be typesafe
    O.map(
        applyFunctions(
            // first to get the first sensor of array
            flow(NEA.head, scalarFormatters.String),
            flow(
                A.size,
                E.fromPredicate(
                    n => n > 1,
                    () => '' // empty string if only one sensor
                ),
                // lets add the other sensors to the count
                E.map(p => ` +${p - 1}`),
                E.toUnion
            )
        )
    ),
    O.map(a => a.join('')),
    orEmptyString
);

const powerFormatter = flow(
    assetLens(['specifications', 'power']).get,
    O.fromNullable,
    O.fold(() => '-', scalarFormatters.Power)
);
const rpmFormatter = flow(
    assetLens(['specifications', 'rpm']).get,
    O.fromNullable,
    O.map(scalarFormatters.RPM),
    orEmptyString
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
    // merges the 3 results into one
    aggregatedSpecifications: flow(
        applyFunctions(maxTempFormatter, rpmFormatter, powerFormatter),
        a => a.join(' / ')
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
