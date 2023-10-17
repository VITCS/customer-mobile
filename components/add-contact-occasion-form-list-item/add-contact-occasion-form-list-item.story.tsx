import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { AddContactOccasionFormListItem } from "./add-contact-occasion-form-list-item"

storiesOf("AddContactOccasionFormListItem", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <AddContactOccasionFormListItem style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
