import { SnackbarProvider } from 'notistack'
import React from 'react'
import { useEffect } from "react"
import CartContextProvider from '../context/cartContext'
import ThemeContextProvider from '../context/themeContext'
import UserContextProvider from '../context/userContext'
function MyApp({Component,pageProps}){
    useEffect(()=>{
        const jssStyles = document.querySelector('#jss-server-side')
        if(jssStyles){
            jssStyles.parentElement.removeChild(jssStyles)
        }
    },[])
    return (

        <ThemeContextProvider>
            <UserContextProvider>
            <CartContextProvider>
                <SnackbarProvider anchorOrigin={{vertical:'top', horizontal:'center'}}>
                <Component {...pageProps} />
                </SnackbarProvider>
            </CartContextProvider>
            </UserContextProvider>
        </ThemeContextProvider>
    )
}
export default MyApp;