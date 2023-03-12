import type {Meta, StoryObj} from "@storybook/react";
import {WidgetPresentation} from "../WidgetPresentation";

const meta = {
  title: "Widgets/WidgetPresentation",
  component: WidgetPresentation,
} satisfies Meta<typeof WidgetPresentation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <WidgetPresentation title={"Titulo"} extra={<div>Extra</div>}>
      <div>Conteudo</div>
    </WidgetPresentation>
  ),
};
