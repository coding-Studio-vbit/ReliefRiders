export const placeRequest = async (formData,token,type)=>{

    const imgsParsed = sessionStorage.getItem('uploaded_images')
    const imgs = JSON.parse(imgsParsed)
    console.log(formData);
    for(const src in imgs){
        console.log(imgs[src]);
        const res = await fetch(imgs[src])
        const blob = await res.blob()
        const file = new File([blob],"image",{type:'image/jpg'})
        formData.append('images',file)
    }
    const res = await fetch(process.env.REACT_APP_URL+`/requests/${type==='p&d'?"pd":"general"}/new`,{
        method:'POST',
         headers: {
             authorization: "Bearer " + token,
           },
         body:formData
     })
     const data = await res.json()
     console.log(data);
     if(data.status === 'success'){
         sessionStorage.clear()
         localStorage.removeItem('new_request')
         localStorage.removeItem('draft')
         return 1;
     }else{
         return data.message
     }
    
}