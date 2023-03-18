import {CenteredLayout} from '@ui/components/layouts/CenteredLayout';
import {BasePanel} from '@ui/components/panels/BasePanel';
import {WidgetServicoLink} from '@ui/components/widgets/WidgetServicoLink';
import {Col, List, Row} from 'antd';
import {LinksExternosWidget} from './LinksExternosWidget';
import {servicesList} from '../../lib/entities/services-list';
import {WorkorderPizzaByStatus} from '../../lib/entities/renders/formatters/workorders/workorder-formatters';
import {workorderApi} from '@services/api/entity-access/self/workorder';
import {useObservable} from '@lib/rxjs/use-observable';
import {flow, pipe} from 'effect';
import * as E from 'fp-ts/Either';
import * as A from 'fp-ts/Array';
import {ArrayCountWidget} from '@ui/components/widgets/from/arrays';
import {companyApi} from '@services/api/entity-access/self/company';
import {unitApi} from '@services/api/entity-access/self/unit';
import {assetApi} from '@services/api/entity-access/self/asset';
import {CompanyTreeMap} from '@ui/components/widgets/charts/CompanyTreeMap';
import {linkTo} from "@code-generators/__GENERATED__/routes";
import {navigate} from "@lib/utils/navigate";

export const RootPage = () => {
  const eitherWorkorders = useObservable(workorderApi.all) ?? E.right([]);
  const eitherCompanies = useObservable(companyApi.all) ?? E.right([]);
  const eitherUnits = useObservable(unitApi.all) ?? E.right([]);
  const eitherAssets = useObservable(assetApi.all) ?? E.right([]);

  // const workorders = pipe(
  //   eitherWorkorders,
  //   E.getOrElseW(() => [] as never)
  // );

  const orEmpty = flow(E.getOrElseW(() => [] as never));

  const workorders = orEmpty(eitherWorkorders);
  const companies = orEmpty(eitherCompanies);
  const units = orEmpty(eitherUnits);
  const assets = orEmpty(eitherAssets);

  const { left: completeWO, right: incompleteWO } = pipe(
    workorders,
    A.partition(f => f.status === 'in progress')
  );

  return (
    <CenteredLayout>
      <BasePanel span={12} title={'Last visited'}>
        <List
          // todo: make it really last visited localStorage or something
          dataSource={servicesList.map(p => ({
            href: p.href,
            title: p.label,
            icon: <p.Icon />,
          }))}
          size={'small'}
          grid={{ column: 2 }}
          split={true}
          renderItem={props => (
            <List.Item>
              <WidgetServicoLink colProps={{ span: 12 }} {...props} />
            </List.Item>
          )}
        />
      </BasePanel>
      <BasePanel span={12} title={'Assets health overview'}>
        <div className={'h-64'}>
          <CompanyTreeMap
            onClick={e => {
              console.log(e);
              navigate(linkTo['/assets/:id']({ id: e.point.options.originalId }));
            }}
            companies={companies}
            units={units}
            assets={assets}
          />
        </div>
      </BasePanel>
      <BasePanel span={12} title={'Work Orders'}>
        <Row align={'middle'} justify={'center'}>
          <Col className={'items-center flex flex-col'} span={6}>
            <ArrayCountWidget title={'Completed'} items={completeWO} />
            <ArrayCountWidget title={'Pending'} items={incompleteWO} />
          </Col>
          <Col span={12} offset={1} className={'h-64'} flex={1}>
            {/*TODO onClick go to pending workorders list*/}
            <WorkorderPizzaByStatus workorders={workorders} />{' '}
          </Col>
        </Row>
      </BasePanel>
      <BasePanel span={6} title={'External links'}>
        <LinksExternosWidget />
      </BasePanel>
      <BasePanel span={6} title={'More'} />
    </CenteredLayout>
  );
};
