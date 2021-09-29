export const deleteAdminByID = async(number,token)=>{
    const url = process.env.REACT_APP_URL
    
    try {
        const res = await fetch(
            `${url}/admin/deleteAdmin`,
            {
                method: `POST`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization' : `Bearer ${token}`
                  },
                body: JSON.stringify({
                    phoneNumber:number
                })
            }
        )
        const data = await res.json()
        console.log(data);
        if(data.status==='success'){
            return {error:null,data:data.message}
        }else{
            return {error:data.message}
        }
    } catch (error) {
        return {error:"Unable to access server"}
    }
}