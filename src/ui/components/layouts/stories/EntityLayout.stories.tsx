import type { Meta, StoryObj } from "@storybook/react";
import { EntityLayout } from "../EntityLayout";
import React from "react";

const meta = {
  title: "Layouts/EntityLayout",
  component: EntityLayout,
} satisfies Meta<typeof EntityLayout>;

export default meta;
type Story = StoryObj<typeof EntityLayout>;

export const Default: Story = {
  render: () => (
    <EntityLayout siderChildren={<div>Sider</div>}>
      <div>Content</div>
    </EntityLayout>
  ),
};
