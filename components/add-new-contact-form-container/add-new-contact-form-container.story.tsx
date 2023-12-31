import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { AddNewContactFormContainer } from "./add-new-contact-form-container"

storiesOf("AddNewContactFormContainer", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <AddNewContactFormContainer style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
