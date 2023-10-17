import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { UserSignupAccountSetupForm } from "./user-signup-account-setup-form"

storiesOf("UserSignupAccountSetupForm", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <UserSignupAccountSetupForm />
      </UseCase>
    </Story>
  ))
