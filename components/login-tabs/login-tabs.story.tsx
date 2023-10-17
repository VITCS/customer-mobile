import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { LoginTabs } from "./login-tabs"

storiesOf("LoginTabs", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <LoginTabs style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
