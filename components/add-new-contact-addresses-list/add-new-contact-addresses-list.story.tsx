import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { AddNewContactAddressesList } from "./add-new-contact-addresses-list"

storiesOf("AddNewContactAddressesList", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <AddNewContactAddressesList style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
