import { AuthProvider } from '../contexts/AuthContext';
import GlobalStyle from '../styles/global';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

import defaultTheme from '../styles/themes/default'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
        <ThemeProvider theme={defaultTheme}>
          <Head>
            <title>gym-life</title>
            <link rel="icon" href="https://play-lh.googleusercontent.com/eYpDhWypRwEmmSL7GPMiilwQEVEj2HISsUW_OflkCLUsdOHz5U9e3ePRu2flVuVKvaI"/>
          </Head>
          <Component {...pageProps} />

          <GlobalStyle />
        </ThemeProvider>
    </AuthProvider>
  )
}

export default MyApp
