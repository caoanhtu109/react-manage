import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { screen, userEvent } from "@storybook/testing-library";
// import { Button } from "./Button";
import NewCollection from "../../components/common/collection/Collection";
import { action } from "@storybook/addon-actions";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Atoms/Collection",
  component: NewCollection,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof NewCollection>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof NewCollection> = args => <NewCollection {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  onCancel: () => {
    action("click");
  },
  subSellec: [
    { id: 1, name: "Tạp chí", created_at: "2022-08-02T04:26:52.586Z", updated_at: "2022-08-10T01:43:21.424Z" },
  ],
  text: "test",
  titleForm: "dasdsa",
  visible: true,
  listfield: [
    { name: "name", title: "Name Product" },
    { name: "price", title: "Price", type: "number" },
    { name: "description", title: "Description", type: "textarea" },
    { name: "category", title: "Category", type: "select" },
    { name: "photo", title: "Image", type: "file" },
  ],
};
// Primary.play = async () => {
//   //actions#automatically-matching-args to learn how to setup logging in the Actions panel
//   const submitButton = screen.getByRole("button");

//   await userEvent.click(submitButton);
// };
