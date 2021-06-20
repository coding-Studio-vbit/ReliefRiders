/* eslint-disable no-undef */
import User from '../../../models/user'
const url = process.env.REACT_APP_URL
export async function registerRider(dispatch, user) {
    dispatch(
        {
            type: `SETUSER`,
            payload: user
        }
    )
    try {
        const res = await fetch(
            `${url}/auth/register/requestOTP`,
            {
                method: `POST`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: `rider`,
                    phone: user.mobile,
                })
            }
        )
            
        
        return _handle(dispatch, res)
    } catch (error) {
        dispatch({
            type:`SETERROR`,
            payload:`Unable to connect to server, please try again later`
        })
        return 0;
    }


}


export async function registerRequester(dispatch, user) {
    dispatch(
        {
            type: `SETUSER`,
            payload: user
        }
    )
    try {
        const res = await fetch(
            `${url}/auth/register/requestOTP`,
            {
                method: `POST`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: `requester`,
                    phone: user.mobile,
                    
                })
            }
        )
        
        return _handle(dispatch, res)
    } catch (error) {

        dispatch({
            type:`SETERROR`,
            payload:`Unable to connect to server, please try again later`
        })
        return 0;
        
    }
}


export async function requestOTPLogin(dispatch, number, type) {
    const user = new User(`xxx`,number)
    dispatch(
        {
            type: `SETUSER`,
            payload: user
        }
    )
    try {
        const res = await fetch(
            `${url}/auth/login/requestOTP`,
            {
                method: `POST`,
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
            type:`SETERROR`,
            payload:`Unable to connect to server, please try again later`
        })
        return 0;
        
    }
    
    
}

/**
 * 
 *  @param {any} dispatch Dispatch object from AuthContext
 */
export function logout(dispatch) {
   
    localStorage.clear();
    dispatch(
        {
            type: `LOGOUT`,
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
            type: `SETUSER`,
            payload: user
        }
    )
    try {
        const url = authType[0]==='r'?`${url}/auth/${authType}${isRequester?`/requester`:`/rider`}/verifyOTP`:
    `${url}/auth/${authType}/verifyOTP`
    const res = await fetch(
        url,
        {
            method: `POST`,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phone: user.mobile,
                type:isRequester?`requester`:`rider`,
                name:user.name,
                OTP:otp,
                yearOfBirth: user.yearOfBirth

            })
        }
    )
    user.isRequester = isRequester
    return _handle(dispatch, res,true,user)
    } catch (error) {
        dispatch({
            type:`SETERROR`,
            payload:`Unable to connect to server, please try again later`
        })
        return 0;
    }
}


async function _handle(dispatch, res,verify=false,user=null) {

   
    if (res.ok) {
        const data = await res.json()
        
        if (data.status[0] === 's') {
            dispatch(
                {
                    type: `SETLOADING`,
                    payload: null
                }
            )
            if(verify){
                const token = data.msg
                dispatch({
                    type:`AUTHENTICATED`,
                    payload:{token,user}
                })
                localStorage.setItem('token',data.message)
                localStorage.setItem('user',JSON.stringify(user))
            }
            return 1;
        } else {
            dispatch({
                type:`SETERROR`,
                payload:data.message
            })
        }
    } else {
        dispatch({
            type:`SETERROR`,
            payload:`Unable to access server.`
        })
        
        
    }
    return 0;
}
