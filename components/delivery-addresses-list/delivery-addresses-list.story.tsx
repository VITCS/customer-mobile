import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { DeliveryAddressesList } from "./delivery-addresses-list"

storiesOf("DeliveryAddressesList", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <DeliveryAddressesList style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
