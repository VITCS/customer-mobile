import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { AddNewContactOccasionsForm } from "./add-new-contact-occasions-form"

storiesOf("AddNewContactOccasionsForm", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <AddNewContactOccasionsForm style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
