import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { SnackbarProvider } from 'notistack'
import React from 'react'
import { useEffect, useState } from "react"
import CartContextProvider from '../context/cartContext'
import ThemeContextProvider from '../context/themeContext'
import UserContextProvider from '../context/userContext'
import Router from 'next/router'
import '../assets/style.css'
import PageLoading from '../components/pageLoading'
// import Layout from '../components/layout'
function MyApp({ Component, pageProps }) {
    const [isLoading, setLoading] = useState(false)
    const start = () => {
        setLoading(true)
        // console.log("loaidng")
    }
    const end = () => {
        setLoading(false)

    }
    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side')
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles)
        }
        Router.events.on("routeChangeStart", start);
        Router.events.on("routeChangeComplete", end);
        Router.events.on("routeChangeError", end);
        return () => {
            Router.events.off("routeChangeStart", start);
            Router.events.off("routeChangeComplete", end);
            Router.events.off("routeChangeError", end);
        }
    }, [])
    return (

        <UserContextProvider>
            <CartContextProvider>
                <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <PayPalScriptProvider>
                        <ThemeContextProvider>
                            {isLoading ? <PageLoading ><Component {...pageProps} /> </PageLoading> : <Component {...pageProps} />}
                        </ThemeContextProvider>
                    </PayPalScriptProvider>
                </SnackbarProvider>
            </CartContextProvider>
        </UserContextProvider>
    )
}
export default MyApp;