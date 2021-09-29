
const url = process.env.REACT_APP_URL
//Operation == 1 login else register
export const requestOTP = async (number,operation=1)=>{
    try {
        const res = await fetch(
            `${url}/admin/requestOTP`,
            {
                method: `POST`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({
                    phoneNumber: number,
                    operation:operation
                })
            }
        )
        const data = await res.json()
        if(data.status==='success'){
            return {error:null}
        }else{
            return {error:data.message}
        }
    } catch (error) {
        console.log(error);
        alert("Unable to access server")
    }
}

export const verifyOTP = async (number,otp)=>{
    try {
        const res = await fetch(
            `${url}/admin/verifyOTP`,
            {
                method: `POST`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({
                    phoneNumber: number,
                    OTP:otp
                })
            }
        )
        const data = await res.json()
        if(data.status==='success'){
            return {error:null,token:data.message}
        }else{
            return {error:data.message}
        }
    } catch (error) {
        console.log(error);
        alert("Unable to access server")
    }
}