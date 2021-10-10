import React from 'react'
import Cookies from 'js-cookie'
import {createContext, useContext, useReducer} from 'react'
const initialState = {
    user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null
}
const UserContext = createContext()
const reducer = (state=initialState,action) =>{
   switch (action.type) {
       case "Login":
           console.log('login')
           return {
               ...state, user:action.payload
           } 
        case "Logout":
            console.log('logout')
            return {
                ...state, user:null
            }
       default:
           return state;
   }
}
export const useUserContext = () => useContext(UserContext)

function UserContextProvider ({children}) {
    const [state,dispatch] = useReducer(reducer,initialState)

    return (
        <UserContext.Provider value={[state,dispatch]}>
            {children}
        </UserContext.Provider>
    )
}
export default UserContextProvider;