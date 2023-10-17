import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { LandingRecommendations } from "./landing-recommendations"

storiesOf("LandingRecommendations", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <LandingRecommendations style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
