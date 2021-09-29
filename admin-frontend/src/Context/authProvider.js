import { createContext } from "react";
import { useLocalStorageState } from "../Utils/useLocalStorageState";


export const AuthContext = createContext();

export const AuthProvider = (prop) => {
    const [token, setToken] = useLocalStorageState("token",null)
    
    const setUpToken = (t)=>setToken(t)
  
    return (
      <AuthContext.Provider
        value={{
          token:token,
          setToken:setUpToken,
        }}
      >
        {prop.children}
      </AuthContext.Provider>
    );
  };