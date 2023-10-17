import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { ProductsFilter } from "./products-filter"

storiesOf("ProductsFilter", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <ProductsFilter style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
