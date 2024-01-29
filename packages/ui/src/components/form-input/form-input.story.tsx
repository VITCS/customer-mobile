import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../../../apps/customer-mobile/storybook/views"
import { color } from "../../../../../apps/customer-mobile/app/theme"
import { FormInput } from "./form-input"

storiesOf("FormInput", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <FormInput style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
