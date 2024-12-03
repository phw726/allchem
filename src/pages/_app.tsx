import { Global } from '@emotion/react'
import { SessionProvider } from 'next-auth/react'
import { css } from '@emotion/css'
import { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import './reset.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { AppProps } from 'next/app'
import { AuthContextProvider } from '../hook/AuthContext'
import 'react-quill/dist/quill.snow.css'

const globalStyle = css`
  * {
    padding: 0;
    box-sizing: border-box;
    font-family: poppins;
  }

  html,
  body,
  #__next {
    height: 100%;
    width: 100%;
  }
`

function App({ Component, pageProps = {} }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  useEffect(() => {
    AOS.init()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <AuthContextProvider>
          <Global styles={globalStyle} />
          <Component {...pageProps} />
        </AuthContextProvider>
      </SessionProvider>
    </QueryClientProvider>
  )
}

export default App
