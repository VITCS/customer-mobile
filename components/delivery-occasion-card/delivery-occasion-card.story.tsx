import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { DeliveryOccasionCard } from "./delivery-occasion-card"

storiesOf("DeliveryOccasionCard", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <DeliveryOccasionCard />
      </UseCase>
    </Story>
  ))
