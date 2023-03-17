import type * as t from 'io-ts';
import type { apiTypes } from '@services/api/validation/api-types';
import { BasePanel } from '@ui/components/panels/BasePanel';
import { BaseWidget } from '@ui/components/widgets/BaseWidget';
import { NotImplementedChart } from '@ui/components/widgets/charts/NotImplementedChart';
import { Button, Col, Row, Space } from 'antd';
import { notImplementedHalMsg } from '@lib/utils/not-implemented';
import { WorkorderTag } from '@ui/components/widgets/workorder/WorkorderTag';

export function AssetContentBody(props: {
  workorders: t.TypeOf<typeof apiTypes.Workorder>[];
}) {
  const { workorders } = props;

  return (
    <Space size={'large'} className={'w-full'} direction={'vertical'}>
      <BasePanel title="General health">
        <Row>
          <Col span={12}>
            Something about uptime
            <NotImplementedChart title={'Uptime'} />
          </Col>
          <Col span={12}>
            Something about status history
            <NotImplementedChart title={'Status'} />
          </Col>
        </Row>
      </BasePanel>
      <BasePanel
        title={
          <Row align={'middle'} justify={'space-between'}>
            <div>Work orders</div>
            <Button
              onClick={notImplementedHalMsg('add a work order')}
              type={'link'}
            >
              Add
            </Button>
          </Row>
        }
      >
        <BaseWidget colProps={{ span: 12 }}>
          <BaseWidget>
            {workorders.length > 0 ? (
              workorders.map(workorder => (
                <WorkorderTag key={workorder.id} workorder={workorder} />
              ))
            ) : (
              <div>No registered work orders for this asset</div>
            )}
          </BaseWidget>
        </BaseWidget>
      </BasePanel>
    </Space>
  );
}
