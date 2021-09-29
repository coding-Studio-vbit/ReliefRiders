export const createAdminHelper = async (phoneNumber,name,otp,token)=>{
    const url = process.env.REACT_APP_URL
    console.log(url);
    try {
        const res = await fetch(
            `${url}/admin/createAdmin`,
            {
                method: `POST`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization' : `Bearer ${token}`
                  },
                body: JSON.stringify({
                    phoneNumber: phoneNumber,
                    name:name,
                    OTP:otp
                })
            }
        )
        const data = await res.json()
        console.log(res);
        if(data.status==='success'){
            return {error:null}
        }else{
            return {error:data.message}
        }
    } catch (error) {
        console.log(error);
        return error
    }
}