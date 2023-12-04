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
            <title>Innova</title>
            <link rel="icon" href="https://yt3.ggpht.com/bH_KFz1xsrTsE5OoynMrakGwVq3eO61BdJ1SIMqygc4Be4NtEHj8MMcU2A13HFTFOLpC8bZRBFc=s88-c-k-c0x00ffffff-no-rj"/>
          </Head>
          <Component {...pageProps} />

          <GlobalStyle />
        </ThemeProvider>
    </AuthProvider>
  )
}

export default MyApp
