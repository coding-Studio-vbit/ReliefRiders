import { createContext, useReducer, React } from "react"
// import Requester from "../../../models/requester";

const AuthRegisterReducer = (state, action) => {
    switch (action.type) {
        case "ISRIDER":

            return { ...state, isRequester: false }
        case "SETUSER":
            return {...state ,loading:false,user:action.payload}
        case "UNLOADING":
            return { ...state, loading: false }
        case "VERIFIED":

            return { ...state, loading: false, user: action.payload };
        case "LOADING":
            return { ...state, loading: true }
        case "LOGOUT":
            return { ...state, user: null }
        case "SHOWOTP":
            return { ...state, showOTP: true, loading: false }
        case "SHOWFORM":
            return { ...state, showOTP: false, loading: false }

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
                loading: state.loading,
                showOTP: state.showOTP,
                dispatch
            }}
        >
            {prop.children}
        </AuthContext.Provider>
    )
}





