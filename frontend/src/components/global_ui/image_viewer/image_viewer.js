/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom";
import styles from "./imageViewer.module.css";
/**
 * 
 * @param  viewerData | {show:boolean,src:img url} (from useState hook)
 * @param setViewerData | setter for viewerData (basically setState from useState hook)
 * @param alt | img alt
 * 
 * @returns Custom img viewer
 */
const ImageViewer = ({ viewerData, setViewerData, alt }) => {
  return viewerData.show
    ? ReactDOM.createPortal(
        <div className={styles.viewer}>
          <div className={styles.modal} >
            <div  className={styles.actions}  >
                <a rel="noreferrer" href={viewerData.src} target='_blank' download >
            <i
              onClick={() => {
                setViewerData({ show: false, src: "",name:'' });
              }}
              className="fas fa-download"
              ></i>
              </a>
            <i
              onClick={() => {
                setViewerData({ show: false, src: "" });
              }}
              className="fas fa-times-circle"
            ></i>
            </div>
            <img src={viewerData.src} alt={alt} />
          </div>
        </div>,
        document.body
      )
    : null;
};
export default ImageViewer;
