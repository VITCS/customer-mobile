import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { MyOrderShipmentDetails } from "./my-order-shipment-details"

storiesOf("MyOrderShipmentDetails", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <MyOrderShipmentDetails style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
