import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string,

    colors: {
      primary: string,
      lightPrimary: string,
      grey: string,
      lightGrey: string,
      darkGrey: string,
      success: string,
      error: string,
      background: string,
      header: string
    },
    fontSizes: {
      default: string,
      large: string,
      small: string,
      tiny: string,
    },
    spacing: {
      default: string,
      vertical: string,
      horizontal: string,
      large: string,
    },
    transition: {
      default: string,
    },
    radius: {
      default: string,
      small: string,
      tiny: string,
    },
    shadows: {
      default: string,
      minimal: string,
      flat: string,
    },
  }
}