import React from "react";
import { useState } from "react";
import styles from "./Upload_images.module.css";
import { useSessionStorageState } from "../../../utils/useLocalStorageState";
import Navbar from "../../global_ui/nav";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { NewRequestContext } from "../../context/new_request/newRequestProvider";

const uploadImages = () => {
  const [err, setErr] = useState({
    input: null,
    check: null,
  });
  const [imgSrcs, setImgSrcs] = useSessionStorageState("uploaded_images", []);
  const { dispatch } = useContext(NewRequestContext);

  const [categories, setcategories] = useSessionStorageState("tags", {Medicine:false,Grocery:false,Misc:false});
  const history = useHistory();

  const onInputChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type.slice(0, 5) !== "image") {
      setErr({ ...err, input: "Please select an image file" });
    } else {
      const src = URL.createObjectURL(file);
      setImgSrcs((images) => [...images, src]);
      document.getElementById("file").value = null;
    }

    
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if(imgSrcs.length === 0 ){
      setErr({
        ...err,
        input:'Please select an image'
      })
    }else {
      
      if(categories.Medicine || categories.Misc || categories.Grocery){
        let list = []
        for(const cat in categories){
          if(categories[cat])
            list.push(cat)
        }
        dispatch({type:"ADD_CATEGORIES_IMAGES",payload:list})
        history.push('address')

      }else{
        setErr({
          ...err,
          check:'Please select a category'
        })
      }
      
    }

    
  };

  const OnCheckBox = (e) => {
    
      let data = {...categories}
      data[e.target.name]=e.target.checked
      
      setcategories(data)
   
    
  };

  const onCancel = () => {
    history.push("/");
  };

  const ButtonEffect = (index) => {
    const list = [...imgSrcs];
    list.splice(index, 1);
    setImgSrcs(list);
  };

  return (
    <>
      <Navbar
        style={{ backgroundColor: "#79CBC5", marginBottom: "10px" }}
        back="list_type"
        backStyle={{ color: "white" }}
        title="Upload Images"
        titleStyle={{ color: "white" }}
      />

      <div className={styles.content_up}>
        <p className={styles.up_img_header}>
          Please choose the items you want to request
        </p>
        {/* <p className={styles.up_error_msg}>{error ? error : ""}</p> */}
        <p className={styles.up_error_msg}>{err.input ? err.input : ""}</p>

        <label htmlFor="file" className={styles.labels}>
          <p className={styles.up_msg}>Upload Images: </p>
          <div className={styles.form_group}>
            <i className="fa fa-upload"></i>
            <p>Tap to add Image</p>
            <input
              type="file"
              id="file"
              name="files"
              onChange={onInputChange}
              multiple
            />
          </div>
        </label>

        {/* <div className={styles.up_img_preview}>         
             <Display previewImages={preview}/>             
             </div> */}

        <div className={styles.up_img_preview}>
          {imgSrcs.map((image, index) => {
            return (
              <div key={index}>
                <img
                  className={styles.img_style}
                  style={{ maxHeight: "350px" }}
                  src={image}
                />
                <button
                  className={styles.img_button}
                  onClick={() => ButtonEffect(index)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>

        <p className={styles.up_error_msg}>{err.check ? err.check : ""}</p>

        <div className={styles.up_list}>
          <div>
            <label className={styles.up_check_label}>
              Medicine
              <input
                type="checkbox"
                name="Medicine"
                
                onChange={OnCheckBox}
              />
              <span className={`${styles.up_check} ${styles.check_1}`}></span>
            </label>
          </div>
          <div>
            <label className={styles.up_check_label}>
              Grocery
              <input
                type="checkbox"
                name="Grocery"
                
                onChange={OnCheckBox}
              />
              <span className={`${styles.up_check} ${styles.check_2}`}></span>
            </label>
          </div>
          <div>
            <label className={styles.up_check_label}>
              Misc.
              <input
                type="checkbox"
                name="Misc"
                
                onChange={OnCheckBox}
              />
              <span className={`${styles.up_check} ${styles.check_3}`}></span>
            </label>
          </div>
        </div>

        <div className={styles.buttonscontrol}>
          <button onClick={onCancel} className={styles.up_img_cancel}>
            Cancel{" "}
          </button>
          <button onClick={onSubmit} className={styles.up_img_button}>
            Proceed
          </button>
        </div>
      </div>
    </>
  );
};

export default uploadImages;

// const Display = ({previewImages}) => {

//     if(!previewImages){
//         return null;
//     }

//     return  previewImages.map((image, index) => <img className={styles.img_style} style={{ maxHeight:'350px'}} key={index} src={image}/> )
// };
