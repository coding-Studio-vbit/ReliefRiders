import React from "react";
import imageCompression from "browser-image-compression";
import styles from "./ImgInput.module.css";

const ImgInput = ({imgHeader,imgText,name,setImages})=>{

  
  
 async function onInputChange(e){

  var imageFile = e.target.files[0];

  var options = {
    maxSizeMB: 0.1,
    useWebWorker: true
  }
  const compressed = await imageCompression(imageFile,options);
  let reader = new FileReader()
  reader.onload = function(){    
    setImages((Image)=>[...Image, reader.result])  
  }
  reader.readAsDataURL(compressed);
  document.getElementById("file").value = null;

  }

  

    return(
        <div className={styles.container}>

        <label htmlFor="file" className={styles.labels}>
          <p className={styles.up_msg}>{imgHeader}</p>
          <div className={styles.form_group}>
            <p>{imgText}</p>
            <input
              type="file"
              id="file"
              name={name}
              onChange={onInputChange}
              multiple
            />
          </div>
        </label>
        

        </div>
    );
};

export default ImgInput;