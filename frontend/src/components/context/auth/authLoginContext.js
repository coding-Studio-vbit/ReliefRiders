import React,{ useState,useContext} from "react";


export const LoginContext=React.createContext()

export function LoginProvider({children}){
    const [authObject, setAuthObject] = useState({
        'isLoggedIn':false,
        'token':null,
        'OTP':null,
        'userObject':null,
        'isOTPRequested':false,
    });

    return(
        <LoginProvider.Provider value={ authObject }>
        {children}

        </LoginProvider.Provider>
    );
    

}