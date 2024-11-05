/*eslint-disable*/
import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

type ThemeType = typeof defaultTheme

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}

// This configuration enables the editor to see and use the theme properties (e.g., colors) directly while coding.
// For example, we can easily access the available theme variables with auto-suggestions without needing to open the defaultTheme file.
