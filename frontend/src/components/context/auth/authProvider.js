import { createContext, useReducer, React } from "react";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "SETERROR":
      return { ...state, loading:false,error: action.payload };
    
    case "ISRIDER":
      return { ...state, isRequester: false };
    case "SETUSER":
      return { ...state, loading : !state.loading, user: action.payload };
    case "SETLOADING":
      return { ...state, loading: !state.loading };
    case "VERIFIED":
      return { ...state, loading: false, user: action.payload };
    case "LOGOUT":
      return { ...state,loading:false, user: null };
    
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

  const [state, dispatch] = useReducer(AuthReducer,
    initState,
  );
  

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
