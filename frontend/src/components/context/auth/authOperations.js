import User from "../../../models/user"

export async function registerRider(dispatch, user) {
    dispatch(
        {
            type: "SETUSER",
            payload: user
        }
    )
    try {
        const res = await fetch(
            "http://localhost:8000/auth/register/requestOTP",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: "rider",
                    phone: user.mobile,
                })
            }
        )
            
        
        return _handle(dispatch, res)
    } catch (error) {
        dispatch({
            type:"SETERROR",
            payload:"Unable to connect to server, please try again later"
        })
        return 0;
    }


}


export async function registerRequester(dispatch, user) {
    dispatch(
        {
            type: "SETUSER",
            payload: user
        }
    )
    try {
        const res = await fetch(
            "http://localhost:8000/auth/register/requestOTP",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: "requester",
                    phone: user.mobile,
                    
                })
            }
        )
        
        return _handle(dispatch, res)
    } catch (error) {

        dispatch({
            type:"SETERROR",
            payload:"Unable to connect to server, please try again later"
        })
        return 0;
        
    }
}


export async function requestOTPLogin(dispatch, number, type) {
    const user = new User("xxx",number)
    dispatch(
        {
            type: "SETUSER",
            payload: user
        }
    )
    try {
        const res = await fetch(
            "http://localhost:8000/auth/login/requestOTP",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: type,
                    phone: number,
    
                })
            }
        )
        return _handle(dispatch, res)

        
    } catch (error) {
        dispatch({
            type:"SETERROR",
            payload:"Unable to connect to server, please try again later"
        })
        return 0;
        
    }
    
    
}

/**
 * 
 *  @param {any} dispatch Dispatch object from AuthContext
 */
export function logout(dispatch) {
    dispatch(
        {
            type: "SETLOADING",
            payload: null
        }
    )
    document.cookie = "val=;expires=Thu ,01 Jan 1970 00:00:00 UTC; path=/;"
    dispatch(
        {
            type: "LOGOUT",
            payload: null
        }
    )
}

/**
 * 
 * @param {any} dispatch Dispatch object from AuthRegisterContext

 */
export async function verify(dispatch, otp,authType,isRequester,user) {
    dispatch(
        {
            type: "SETLOADING",
            payload: null
        }
    )
    try {
        const url = authType[0]==='r'?`http://localhost:8000/auth/${authType}${isRequester?"/requester":"/rider"}/verifyOTP`:
    `http://localhost:8000/auth/${authType}/verifyOTP`
    const res = await fetch(
        url,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phone: user.mobile,
                type:isRequester?"requester":"rider",
                name:user.name,
                OTP:otp,
                yearOfBirth: user.yearOfBirth

            })
        }
    )
   
    return _handle(dispatch, res)
    } catch (error) {
        dispatch({
            type:"SETERROR",
            payload:"Unable to connect to server, please try again later"
        })
        return 0;
    }
}


async function _handle(dispatch, res) {

   
    if (res.ok) {
        const data = await res.json()
        console.log(data);
        if (data.status[0] === 's') {
            dispatch(
                {
                    type: "SETLOADING",
                    payload: null
                }
            )
            return 1;
        } else {
            dispatch({
                type:"SETERROR",
                payload:data.message
            })
        }
    } else {
        dispatch({
            type:"SETERROR",
            payload:"Unable to access server."
        })
        
        
    }
    return 0;
}
