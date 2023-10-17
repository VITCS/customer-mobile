import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { ContactOccassionEditForm } from "./contact-occassion-edit-form"

storiesOf("ContactOccassionEditForm", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <ContactOccassionEditForm style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
