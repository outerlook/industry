import type { Meta, StoryObj } from '@storybook/react';
import type { validTypes } from '@services/api/validation/valid-types';
import { CompanyTreeMap } from '../CompanyTreeMap';

const meta = {
  title: 'Widgets/Charts/HierarchyTreeOnValue',
  component: CompanyTreeMap,
} satisfies Meta;

const data = {
  assets: [
    { id: 'asset1', name: 'asset1', unitId: 'unit1', healthscore: 10 },
    { id: 'asset2', name: 'asset2', unitId: 'unit1', healthscore: 20 },
    { id: 'asset3', name: 'asset3', unitId: 'unit2', healthscore: 30 },
    { id: 'asset4', name: 'asset4', unitId: 'unit2', healthscore: 40 },
    { id: 'asset5', name: 'asset5', unitId: 'unit3', healthscore: 50 },
  ] as unknown as validTypes['Asset'][],
  units: [
    { id: 'unit1', name: 'unit1', companyId: 'company1' },
    { id: 'unit2', name: 'unit2', companyId: 'company1' },
    { id: 'unit3', name: 'unit3', companyId: 'company2' },
  ] as unknown as validTypes['Unit'][],
  companies: [
    { name: 'company1', id: 'company1' },
    { name: 'company2', id: 'company2' },
  ] as unknown as validTypes['Company'][],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    companies: data.companies,
    units: data.units,
    assets: data.assets,
  },
  render: props => <CompanyTreeMap {...props} />,
};
