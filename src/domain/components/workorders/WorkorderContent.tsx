import type * as t from 'io-ts';
import * as I from 'fp-ts/Identity';
import type {apiTypes} from '@services/api/validation/api-types';
import type {Action} from '@ui/components/common/ActionButtons';
import {getBreadcrumb} from '@ui/components/common/Breadcrumb/schema-breadcrumbs';
import {EntityHeader} from '@ui/components/common/EntityHeader';
import {EntityLayout} from '@ui/components/layouts/EntityLayout';
import {WidgetPresentation} from '@ui/components/widgets/generic-entities/WidgetPresentation';
import {notImplementedHalMsg} from '@lib/utils/not-implemented';
import type {validTypes} from '@services/api/validation/valid-types';
import {pipe} from 'effect';
import {assetFormatters} from '../../lib/entities/renders/formatters/asset-formatters';
import {SiderAttributes} from '@ui/components/common/SiderAttributes';

type Props = {
    company: t.TypeOf<typeof apiTypes.Company>;
    unit: t.TypeOf<typeof apiTypes.Unit>;
    workorder: t.TypeOf<typeof apiTypes.Workorder>;
    asset: t.TypeOf<typeof apiTypes.Asset>;
};

export const WorkorderContent = (props: Props) => {
    const {company, unit, asset, workorder} = props;

    const actions = [
        {
            label: 'edit',
            onClick: notImplementedHalMsg('edit'),
        },
        {label: 'delete', onClick: notImplementedHalMsg('delete')},
        {label: 'share', onClick: notImplementedHalMsg('share')},
        {label: 'other', onClick: notImplementedHalMsg('other')},
    ] satisfies Action[];

    const breadcrumbItems = getBreadcrumb.forWorkorders({
        asset,
        company,
        unit,
        workorder,
    });

    return (
        <EntityLayout
            siderChildren={
                <>
                    <WidgetPresentation title={workorder.title}/>
                    <SiderAttributes attributes={toSideAttributesProps({asset})}/>
                </>
            }
        >
            <EntityHeader
                breadcrumbProps={{items: breadcrumbItems}}
                actions={actions}
                title={workorder.title}
            />
        </EntityLayout>
    );
};

const toSideAttributesProps = ({asset}: { asset: validTypes['Asset'] }) =>
    pipe(
        I.Do,
        I.bind('assetName', () => assetFormatters.nameLink(asset)),

        // reorder
        I.map(({assetName}) => [assetName])
    );
