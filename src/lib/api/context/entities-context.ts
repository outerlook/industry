import {generateContext} from "@/lib/api/context/generate-context";
import type {validTypes} from "@/lib/io-ts/valid-types";


export const [AssetProvider, useAsset, WithAssetProvider] = generateContext<validTypes['Asset']>()
export const [UserProvider, useUser] = generateContext<validTypes['User']>()
export const [UnitProvider, useUnit] = generateContext<validTypes['Unit']>()
export const [CompanyProvider, useCompany] = generateContext<validTypes['Company']>()
export const [WorkorderProvider, useWorkorder] = generateContext<validTypes['Workorder']>()
