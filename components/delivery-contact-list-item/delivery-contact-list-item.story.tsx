import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { DeliveryContactListItem } from "./delivery-contact-list-item"

storiesOf("DeliveryContactListItem", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <DeliveryContactListItem style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
