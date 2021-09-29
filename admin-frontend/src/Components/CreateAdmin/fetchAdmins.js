export const fetchAdmins = async(token)=>{
    const url = process.env.REACT_APP_URL

    try {
        const res = await fetch(
            `${url}/admin/fetchAdmins`,
            {
                method: `GET`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization' : `Bearer ${token}`
                  },
                
            }
        )
        const data = await res.json()
        console.log(res);
        if(data.status==='success'){
            return {error:null,data:data.message}
        }else{
            return {error:data.message}
        }
    } catch (error) {
        return {error:"Unable to access server"}
    }
}