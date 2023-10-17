import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { UserSignupPaymentsSetupForm } from "./user-signup-payments-setup-form"

storiesOf("UserSignupPaymentsSetupForm", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <UserSignupPaymentsSetupForm style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
