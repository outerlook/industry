import {BasePanel} from "../BasePanel";
import type {Meta, StoryObj} from "@storybook/react";

const meta = {
  title: "Panels/BasePanel",
  component: BasePanel,
  // user to control span value
  args: {
    titulo: "Titulo",
    span: 8,
  },
  argTypes: {
    titulo: {
      type: "string",
      description: "Titulo do painel",
      control: {
        type: "text",
      },
    },
    span: {
      type: "number",
      control: {
        type: "range",
        min: 1,
        max: 24,
      },
    },
  },
} satisfies Meta<typeof BasePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => (
    <div className={"w-full"}>
      <BasePanel {...props}>
        <div>Conteudo</div>
      </BasePanel>
    </div>
  ),
};
