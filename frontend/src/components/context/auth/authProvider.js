import { createContext, useReducer, React } from "react"
import Requester from "../../../models/requester";

const AuthRegisterReducer = (state, action) => {
    switch (action.type) {
        case "REQUEST_OTP":
            return { ...state, otp: action.payload, loading: false };
        case "VERIFY":
            //TODO
            return state;
        case "LOADING":
            return { ...state, loading: true }


    }
}

const initState = {
    isRequester: true,
    user: null,
    loading: false,
    otp: null
}

export const AuthContext = createContext()

export const AuthProvider = (prop) => {
    const [state, dispatch] = useReducer(AuthRegisterReducer, initState)




    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isRequester: state.isRequester,
                loading: state.otp,
                otp: state.otp,
                dispatch
            }}
        >
            {prop.children}
        </AuthContext.Provider>
    )
}
/* eslint-disable */

/**
 * 
 * @param {any} dispatch Dispatch object from AuthRegisterContext
 * @param {string} otp OTP
 * @param {string} number number 
 */
function verify(dispatch, otp, number) {

}
/**
 * 
 * @param {any} dispatch Dispatch object from AuthRegisterContext
 * @param {any} user user model
 */
export function requestOTP(dispatch, user) {
    dispatch(
        {
            type: "LOADING",
            payload: null
        }
    )
    if (user instanceof Requester) {
        console.log("req");
    } else {
        console.log("rider");
    }
    dispatch(
        {
            type: "REQUEST_OTP",
            payload: 1234
        }
    )

}
/**
 * 
 *  @param {any} dispatch Dispatch object from AuthRegisterContext
 * @param {User} user user model
 */
export function logout(dispatch, user) {
    
}