export const fetchOrder = async(requestNumber,token)=>{
    const url = process.env.REACT_APP_URL
    
    try {
        const res = await fetch(
            `${url}/requests/byRequestNumber`,
            {
                method: `POST`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization' : `Bearer ${token}`
                  },
                body: JSON.stringify({
                    requestNumber: requestNumber,
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
        console.log(error);
        alert("Unable to access server, please try again later")
    }
}