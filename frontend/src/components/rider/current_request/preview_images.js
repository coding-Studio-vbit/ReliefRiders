import React, { useState } from "react";
import ImageViewer from "../../global_ui/image_viewer/image_viewer";

import styles from "./current_request.module.css";
const PreviewImages = ({ setImages, title, images, imgWidth = "150px" }) => {
  const [imageViewerData, setImageViewerData] = useState({
    show: false,
    src: "",
  });
  const deleteImage = (index) => {
    console.log(index);
    setImages((imgs) => {
      const imgList = [...imgs]
      imgList.splice(index, 1)

      return [...imgList]
    })
  }
  const onImageClicked = (src) => {
    setImageViewerData({ show: true, src: src });
  };
  return (
    <>
      {images.length > 0 && <span style={{ padding: '0.5em' }} >{title}</span>}
      <div key={title}
        style={{
          gridTemplateColumns: `repeat(auto-fit,minmax(${imgWidth},1fr))`

        }}
        className={styles.imagesContainer}>
        <ImageViewer
          setViewerData={setImageViewerData}
          viewerData={imageViewerData}
          alt="image"
        />


        {images.map((link, index) => (
          
          <div

            className={styles.singleImage}
            key={link}
          >
            <i onClick={() => deleteImage(index)} className="fas fa-times-circle" ></i>
            <img style={{
              width: imgWidth ? imgWidth : 'clamp(160px, 50%, 200px)'

            }} onClick={() => onImageClicked(link)} src={link} alt="img" />
          </div>
        ))}
      </div>
    </>
  );
};
export default PreviewImages;
