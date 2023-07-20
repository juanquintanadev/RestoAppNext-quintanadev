import { useEffect, useState } from 'react'
import '../styles/globals.css'
import { QuioscoProvider } from '../context/QuioscoProvider'

function MyApp({ Component, pageProps }) {

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient ?
        <QuioscoProvider>
          <Component {...pageProps} />
        </QuioscoProvider>
       : null
}


export default MyApp
