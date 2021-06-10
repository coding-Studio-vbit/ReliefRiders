import { createContext, useReducer, React } from "react";
// import Requester from "../../../models/requester";

const AuthRegisterReducer = (state, action) => {
  switch (action.type) {
    case "SETERROR":
        console.log("gg");
      return { ...state, error: action.payload };
    case "REMOVEERROR":
      return { ...state, error: "" };
    case "ISRIDER":
      return { ...state, isRequester: false };
    case "SETUSER":
      return { ...state, loading: false, user: action.payload };
    case "UNLOADING":
      return { ...state, loading: false };
    case "VERIFIED":
      return { ...state, loading: false, user: action.payload };
    case "LOADING":
      return { ...state, loading: true, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "SHOWOTP":
      return { ...state, showOTP: true, loading: false };
    case "SHOWFORM":
      return { ...state, showOTP: false, loading: false };
  }
};

const initState = {
  isRequester: true,
  user: null,
  loading: false,
  isAuthenticated: false,
  error: "",
};

export const AuthContext = createContext();

export const AuthProvider = (prop) => {
  const [state, dispatch] = useReducer(AuthRegisterReducer, initState);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isRequester: state.isRequester,
        loading: state.loading,
        isAuthenticated: state.isAuthenticated,
        error: state.error,
        dispatch,
      }}
    >
      {prop.children}
    </AuthContext.Provider>
  );
};
