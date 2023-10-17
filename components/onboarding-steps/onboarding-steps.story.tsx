import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { OnboardingSteps } from "./onboarding-steps"

storiesOf("OnboardingSteps", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <OnboardingSteps style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
