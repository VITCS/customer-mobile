import { IButtonProps, ITextProps } from "native-base"
import { TxKeyPath } from "../../i18n"
import { ButtonPresetNames } from "./button.presets"

export interface ButtonProps extends IButtonProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string

  /**
   * An optional style override useful for padding & margin.
   */

  /**
   * One of the different types of text presets.
   */
  preset?: ButtonPresetNames

  /**
   * One of the different types of text presets.
   */
  // children?: React.ReactNode

  textProps?: ITextProps
}
