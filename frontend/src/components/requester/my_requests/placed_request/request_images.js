import React from "react";
import { useState } from "react/cjs/react.development";
import ImageViewer from "../../../global_ui/image_viewer/image_viewer";

import styles from "./request_images.module.css";
const RequestImages = ({ bills, images, items = [] }) => {
  const [imageViewerData, setImageViewerData] = useState({
    show: false,
    src: "",
  });

  const onImageClicked = (src) => {
    console.log(src);
    setImageViewerData({ show: true, src: src });
  };
  return (
    <div className={styles.imagesContainer}>
      <ImageViewer
        setViewerData={setImageViewerData}
        viewerData={imageViewerData}
        alt="image"
      />

      {items.map((link) => {
        console.log(process.env.REACT_APP_URL + link);

        return (
          <div
            onClick={() =>
              onImageClicked(process.env.REACT_APP_URL + link)
            }
            className={styles.singleImage}
            key={link}
          >
            <img src={process.env.REACT_APP_URL + link} alt="items-img" />
            <span>Items</span>
          </div>
        );
      })}
      {bills.map((link, index) => (
        <div
          onClick={() =>
            onImageClicked(process.env.REACT_APP_URL + link)
          }
          className={styles.singleImage}
          key={link}
        >
          <img src={process.env.REACT_APP_URL + link} alt="bills-img" />
          <span>Bill #{index + 1}</span>
        </div>
      ))}
      {images.map((link) => (
        <div
          onClick={() =>
            onImageClicked(process.env.REACT_APP_URL + link)
          }
          className={styles.singleImage}
          key={link}
        >
          <img src={process.env.REACT_APP_URL + link} alt="img" />
          <span>Rider-Selfie</span>
        </div>
      ))}
    </div>
  );
};
export default RequestImages;
