import React from 'react'
import Cookies from 'js-cookie'
import {createContext , useContext, useReducer } from 'react'
const initialState = {
    darkMode: Cookies.get("darkMode") === undefined ? false : Cookies.get("darkMode") ==="ON" ? true : false
}
const reducer = (state = initialState ,action) =>{
        switch (action.type) {
            case "DARKMODE_ON":
                // Cookies.set("darkMode","ON")
                return {...state, darkMode:true}
            case "DARKMODE_OFF":
                // Cookies.set("darkMode","OFF")
                return {...state, darkMode:false}
            default:
                return state;
        }
    
}

const ThemeContext = createContext()
export const useThemeContext = () => useContext(ThemeContext);
function ThemeContextProvider(props) {
    const [state, dispatch] = useReducer(reducer,initialState)
    console.log("cookie value",Cookies.get("darkMode"))
    // useEffect(()=>{
    //     if(state.darkMode){
    //         Cookies.set("darkMode","ON")
    //     }else {
    //         Cookies.set("darkMode","OFF")
    //     }
    // },[state])
    return (
        <ThemeContext.Provider value={[state,dispatch]} >
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider;
