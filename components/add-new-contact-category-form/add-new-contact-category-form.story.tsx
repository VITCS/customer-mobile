import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { AddNewContactCategoryForm } from "./add-new-contact-category-form"

storiesOf("AddNewContactCategoryForm", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <AddNewContactCategoryForm style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
