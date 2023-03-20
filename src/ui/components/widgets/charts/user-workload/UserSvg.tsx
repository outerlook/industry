import { UserOutlined } from '@ant-design/icons';
import type { HandleEvent, WorkUser } from './UserWorkload';
import { Render } from './UserWorkload';
import { Popover } from 'antd';

export const UserSvg = (props: {
  user: WorkUser;
  onClick?: HandleEvent<WorkUser> | undefined;
  renderTooltip?: Render<WorkUser> | undefined;
}) => {
  const { user, onClick, renderTooltip } = props;
  return (
    <div>
      <Popover placement={'bottomRight'} title={renderTooltip?.(user)}>
        <UserOutlined onClick={() => onClick?.(user)} />
      </Popover>
    </div>
  );
};
