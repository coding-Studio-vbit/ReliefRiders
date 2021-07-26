
export const finishRequest = async (token, cancel = false) => {
  try {
    if(cancel){
      const url = process.env.REACT_APP_URL + `/rider/cancelDelivery`;
      return await cancelDelivery(url,token)
    }
    else{

    
    const formData = new FormData()
    const imgsParsed = sessionStorage.getItem('i-images')
    const imgs = JSON.parse(imgsParsed)
    const imgsParsedBills = sessionStorage.getItem('b-images')
    const bills = JSON.parse(imgsParsedBills)

    for(const src in bills){
        const res = await fetch(imgs[src])
        const blob = await res.blob()
        const file = new File([blob],"bill",{type:'image/jpg'})
        formData.append('images',file)
    }

    for(const src in imgs){
        const res = await fetch(imgs[src])
        const blob = await res.blob()
        const file = new File([blob],"image",{type:'image/jpg'})
        formData.append('images',file)
    }

    
    
    const  url = process.env.REACT_APP_URL + `/rider/finishDelivery`;
    
    const res = await fetch(url, {
      method: "POST",
      headers: {
        authorization: "Bearer " + token,
      },
      body:formData
    });
    const data = await res.json();
    console.log(data);
    if (data.status === "success") {
      sessionStorage.clear();
      return 1;
    } else {
      return data.message;
    }
    }
  } catch (error) {
      console.log(error);
    return "Unable  to access server, Please try again later";
  }
};

const cancelDelivery = async (url,token)=>{
  const res = await fetch(url, {
    method: "GET",
    headers: {
      authorization: "Bearer " + token,
    },
    
  });
  const data = await res.json();
  console.log(data);
  if (data.status === "success") {
    sessionStorage.clear();
    return 1;
  } else {
    
    return data.message;
  }
}