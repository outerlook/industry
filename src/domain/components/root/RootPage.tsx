import {CenteredLayout} from '@ui/components/layouts/CenteredLayout';
import {BasePanel} from '@ui/components/panels/BasePanel';
import {WidgetServicoLink} from '@ui/components/common/widgets/WidgetServicoLink';
import {Col, List, Row} from 'antd';
import {LinksExternosWidget} from './LinksExternosWidget';
import {servicesList} from '../../lib/entities/services-list';
import {
    WorkorderPizzaByStatus,
    WorkorderTotals,
} from '../../lib/entities/renders/formatters/workorders/workorder-formatters';
import {workorderApi} from '@services/api/entity-access/self/workorder';
import {useObservable} from '@lib/rxjs/use-observable';
import {pipe} from 'effect';
import * as E from 'fp-ts/Either';

export const RootPage = () => {
    const eitherWorkorders = useObservable(workorderApi.all) ?? E.right([]);

    const workorders = pipe(
        eitherWorkorders,
        E.getOrElseW(e => [] as never[])
    );

    return (
        <CenteredLayout>
            <BasePanel span={12} title={'Last visited'}>
                <List
                    // todo: make it really last visited localStorage or something
                    dataSource={servicesList.map(p => ({
                        href: p.href,
                        title: p.label,
                        icon: <p.Icon/>,
                    }))}
                    size={'small'}
                    grid={{column: 2}}
                    split={true}
                    renderItem={props => (
                        <List.Item>
                            <WidgetServicoLink colProps={{span: 12}} {...props} />
                        </List.Item>
                    )}
                />
            </BasePanel>
            <BasePanel span={12} title={'General status'}/>
            <BasePanel span={12} title={'Work Orders'}>

                    <Col span={12}>
                        <WorkorderTotals workorders={workorders}/>
                    </Col>
                    <Col className={'h-32'} span={12}>
                        <WorkorderPizzaByStatus workorders={workorders}/>
                    </Col>

            </BasePanel>
            <BasePanel span={6} title={'External links'}>
                <LinksExternosWidget/>
            </BasePanel>
            <BasePanel span={6} title={'More'}/>
        </CenteredLayout>
    );
};
