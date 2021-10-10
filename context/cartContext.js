import React ,{createContext, useContext, useReducer}from 'react'
import Cookies from 'js-cookie'
const initialState = {
    cartItems: Cookies.get("cartItems") ? JSON.parse(Cookies.get("cartItems")) : [],
    shippingInfo: Cookies.get("shippingInfo") ? JSON.parse(Cookies.get("shippingInfo")) : {},
    paymentMethod: Cookies.get('paymentMethod') || '',
    loading:false,
}

const reducer = (state = initialState,action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            console.log("add to cart")
            let newItem = action.payload
            //if item with same name exists in cart
            let itemExists = state.cartItems.find(each=>each.name === newItem.name)
            
            let newCartItems = []
            //if item exist ,  replace item with updated newItem
            if(itemExists){
                newCartItems = state.cartItems.map(each=>each.name === newItem.name ? newItem : each)
            }else {
                //else add new item to cart
                newCartItems = [...state.cartItems, newItem]
            }
            Cookies.set("cartItems",JSON.stringify(newCartItems))
           return {
               ...state, cartItems:[...newCartItems]
           }
        case "CHANGE_LOADING_STATE":
            return {
                ...state, loading: !state.loading
            }
        case "REMOVE_FROM_CART":
            let id= action.payload
            let filtered = state.cartItems.filter(each=>each._id !==id)
            Cookies.set("cartItems",JSON.stringify(filtered))
            return {
                ...state, cartItems:[...filtered]
            }
        case "SAVE_SHIPPING_INFO":
            return {
                ...state, shippingInfo:{...action.payload}
            }
        case "SAVE_PAYMENT_METHOD":
            return {
                ...state, paymentMethod:action.payload
            }
        case "RESET":
            return {
                ...state,cartItems:[]
            }
        default:
            return state;
    }
}
const CartContext = createContext()
export const useCartContext = () => useContext(CartContext)
export default function CartContextProvider (props){
    const [state, dispatch] = useReducer(reducer,initialState)
    return (
        <CartContext.Provider value={[state,dispatch]}>
            {props.children}
        </CartContext.Provider>
    )
}