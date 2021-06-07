import { createContext, useReducer, React } from "react"
import Requester from "../../../models/requester";

const AuthRegisterReducer = (state, action) => {
    switch (action.type) {
        case "UNLOADING":
            return { ...state, loading: false }
        case "VERIFIED":

            return { ...state, loading: false, user: action.payload };
        case "LOADING":
            return { ...state, loading: true }
        case "LOGOUT":
            return { ...state, user: null }
        case "SHOWOTP":
            return { ...state, showOTP: true,loading:false }
        case "SHOWFORM":
            return { ...state, showOTP: false,loading:false }

    }
}

const initState = {
    isRequester: true,
    user: null,
    loading: false,
    showOTP: false
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
                showOTP: state.showOTP,
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
    dispatch(
        {
            type: "LOADING",
            payload: null
        }
    )
    //todo
    //cookie store
    dispatch(
        {
            type: "UNLOADING",
            payload: null
        }
    )

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
            type: "SHOWOTP",
            payload: null
        }
    )

}
/**
 * 
 *  @param {any} dispatch Dispatch object from AuthRegisterContext
 * @param {User} user user model
 */
export function logout(dispatch, user) {
    //cookie destroy
    //delete user
}