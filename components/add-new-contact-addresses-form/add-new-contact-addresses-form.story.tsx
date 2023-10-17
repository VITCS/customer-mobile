import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { AddNewContactAddressesForm } from "./add-new-contact-addresses-form"

storiesOf("AddNewContactAddressesForm", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <AddNewContactAddressesForm style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
