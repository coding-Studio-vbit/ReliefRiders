import { createContext, useReducer,React } from "react"

const AuthRegisterReducer = (state,action)=>{
    switch (action.type) {
        case "REQUEST_OTP":
            //TODO
            return state;
        case "VERIFY":
            //TODO
            return state;
        
    }
}

const initState = {
    isRequester: true,
    user:null
}

export const AuthRegisterContext = createContext()

export const AuthRegisterProvider = (prop) => {
    const [state,dispatch] = useReducer(AuthRegisterReducer,initState)

    return (
        <AuthRegisterContext.Provider
            value={{
                requesterDetails:state.requesterDetails,
                riderDetails:state.riderDetails,
                isRequester:state.isRequester,
                number:state.number,
                dispatch
            }}
        >
            {prop.children}
        </AuthRegisterContext.Provider>
    )
}
/* eslint-disable */

/**
 * 
 * @param {any} dispatch Dispatch object from AuthRegisterContext
 * @param {string} otp OTP
 * @param {any} state State from AuthRegisterContext
 */
export function verify(dispatch,otp,state) {
    
}
/**
 * 
 * @param {any} dispatch Dispatch object from AuthRegisterContext
 * @param {any} state State from AuthRegisterContext
 */
export function requestOTP(dispatch,state) {
    
}