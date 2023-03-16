import { linkTo } from '@code-generators/__GENERATED__/routes';
import { entityConfig } from './entities-mapping';

export const servicesList = [
  {
    label: 'Companies',
    href: linkTo['/companies']({}),
    Icon: entityConfig['Company']['Icon'],
  },
  {
    label: 'Units',
    href: linkTo['/units']({}),
    Icon: entityConfig['Unit']['Icon'],
  },
  {
    label: 'Users',
    href: linkTo['/users']({}),
    Icon: entityConfig['User']['Icon'],
  },
  {
    label: 'Assets',
    href: linkTo['/assets']({}),
    Icon: entityConfig['Asset']['Icon'],
  },
  {
    label: 'Workorders',
    href: linkTo['/workorders']({}),
    Icon: entityConfig['Workorder']['Icon'],
  },
] satisfies {
  label: string;
  href: string;
  Icon: React.FC;
}[];
