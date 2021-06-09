export async function registerRider(dispatch, user) {
    dispatch(
        {
            type: "LOADING",
            payload: null
        }
    )
    const res = await fetch(
        "http://localhost:8000/auth/register/requestOTP",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: "rider",
                phone: user.number,
                name: user.name,
            })
        }
    )
    dispatch({
        type:"SHOWOTP",
        payload:null
    })
    _handle(dispatch, res, user)

}


export async function registerRequester(dispatch, user) {
    dispatch(
        {
            type: "LOADING",
            payload: null
        }
    )
    const res = await fetch(
        "http://localhost:8000/auth/register/requestOTP",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: "requester",
                phone: user.number,
                
            })
        }
    )
    console.log(res);
    dispatch({
        type:"SHOWOTP",
        payload:null
    })
    _handle(dispatch, res, user)
}


export async function requestOTPLogin(dispatch, number, type) {
    dispatch(
        {
            type: "LOADING",
            payload: null
        }
    )
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
    dispatch({
        type:"SHOWOTP",
        payload:null
    })
    _handle(dispatch, res)
}

/**
 * 
 *  @param {any} dispatch Dispatch object from AuthContext
 */
export function logout(dispatch) {
    dispatch(
        {
            type: "LOADING",
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
export async function verify(dispatch, otp,user) {
    dispatch(
        {
            type: "LOADING",
            payload: null
        }
    )
    const res = await fetch(
        "http://localhost:8000/auth/register/requester/verifyOTP",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phone: user.number,
                name:user.name,
                OTP:otp,
                yearOfBirth:user.yearOfBirth

            })
        }
    )
    
    await _handle(dispatch, res)
    console.log("s");
    

}

async function _handle(dispatch, res, user = null) {
    
    if (res.ok) {
        const data = await res.json()
        if (data.status[0] === 's') {
            console.log(data);
            if (data.user) {
                dispatch(
                    {
                        type: "SETUSER",
                        payload: data.user
                    }
                )
            } else {
                dispatch(
                    {
                        type: "SETUSER",
                        payload: user
                    }
                )
            }
        } else {
            //error handle
        }
    } else {
        //handle error
    }
}
