import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { UserSignupDeliveryContactsForm } from "./user-signup-delivery-contacts-form"

storiesOf("UserSignupDeliveryContactsForm", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <UserSignupDeliveryContactsForm style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
