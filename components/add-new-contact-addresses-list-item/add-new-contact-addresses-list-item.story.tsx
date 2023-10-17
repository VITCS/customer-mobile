import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { AddNewContactAddressesListItem } from "./add-new-contact-addresses-list-item"

storiesOf("AddNewContactAddressesListItem", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <AddNewContactAddressesListItem style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
