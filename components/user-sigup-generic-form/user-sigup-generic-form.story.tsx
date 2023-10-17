import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { UserSigupGenericForm } from "./user-sigup-generic-form"

storiesOf("UserSigupGenericForm", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <UserSigupGenericForm style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
