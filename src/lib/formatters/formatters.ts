import { customScalars } from "../io-ts/attributes";
import * as t from 'io-ts'
import * as ts from 'io-ts-types'
import match from '@effect/match'

type BasicAttributesUsed = t.StringType | t.NumberType | ts.DateC
type PossibleAttributes = (typeof customScalars)[keyof typeof customScalars] | BasicAttributesUsed;



const formatAttribute = (attribute: PossibleAttributes) => {
    return match.value(attribute)

}
