import React from "react";
import imageCompression from "browser-image-compression";
import styles from "./ImgInput.module.css";

const ImgInput = ({ imgHeader, imgText, setImages}) => {

  async function onInputChange(e) {
    var imageFile = e.target.files[0];
    var options = {
      maxSizeMB: 0.1,
      useWebWorker: true,
    };
    const compressed = await imageCompression(imageFile, options);
    let reader = new FileReader();
    reader.onload = function () {
      setImages((Image) => [...Image, reader.result]);
    };
    reader.readAsDataURL(compressed);
    document.getElementById(imgHeader).value = null;
  }

  return (
    <div key={imgHeader} className={styles.container}>
      <label className={styles.labels}>
        <p className={styles.up_msg}>{imgHeader}</p>
        <div className={styles.form_group}>
          <p>{imgText}</p>
          <input
            type="file"
            id={imgHeader}
            name={imgHeader}
            onChange={onInputChange}
            multiple
          />
        </div>
      </label>
    </div>
  );
};

export default ImgInput;
