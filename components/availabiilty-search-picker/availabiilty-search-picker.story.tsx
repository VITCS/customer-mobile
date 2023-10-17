import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { AvailabiiltySearchPicker } from "./availabiilty-search-picker"

storiesOf("AvailabiiltySearchPicker", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <AvailabiiltySearchPicker style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
