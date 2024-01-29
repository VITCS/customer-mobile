import i18n from "i18n-js"
import { ITextProps } from "native-base"
import { TxKeyPath } from "../../i18n"
import { TextPresets } from "./text.presets"

export interface TextProps extends ITextProps {
  /**
   * Children components.
   */

  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath

  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: i18n.TranslateOptions

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
  preset?: TextPresets
}
