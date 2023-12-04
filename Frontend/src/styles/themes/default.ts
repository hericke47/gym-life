export default {
  title: 'light',

  colors: {
    primary: '#EC5E4F',
    lightPrimary: '#e8ebfe',
    grey: '#5f6378',
    lightGrey: '#a7a8b7',
    darkGrey: '#4f5266',
    success: '#20C05C',
    error: '#FD4F48',
    background: '#fff',
    header: '#fff'
  },
  fontSizes: {
    default: '1.4rem',
    large: '1.6rem',
    small: '1.2rem',
    tiny: '1rem',
  },
  spacing: {
    default: '1.6rem',
    vertical: '1.6rem 0',
    horizontal: '0 1.6rem',
    large: '2.4rem',
  },
  transition: {
    default: '180ms ease-in-out',
  },
  radius: {
    default: '0.8rem',
    small: '0.4rem',
    tiny: '0.2rem',
  },
  shadows: {
    default: '0 0.5rem 2rem rgba(0, 0, 0, 0.08)',
    minimal: '0 0.5rem 0.5rem rgba(0, 0, 0, 0.08)',
    flat: '0 0.2rem 0.2rem rgba(0, 0, 0, 0.08)',
  },
} as const;