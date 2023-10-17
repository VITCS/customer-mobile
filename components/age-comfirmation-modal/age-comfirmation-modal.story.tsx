import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { AgeComfirmationModal } from "./age-comfirmation-modal"

storiesOf("AgeComfirmationModal", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <AgeComfirmationModal style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
