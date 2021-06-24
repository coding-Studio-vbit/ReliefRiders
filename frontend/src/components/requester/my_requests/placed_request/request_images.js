import React from 'react';
import styles from './request_images.module.css'
const RequestImages = ({ bills, images, items = [] }) => {
    return (
        <div className={styles.imagesContainer}>
            {items.map((link) => (
                <div className={styles.singleImage} key={link}>
                    <img src={link} alt="items-img" />
                    <span>Items</span>
                </div>
            ))}
            {bills.map((link, index) => (
                <div className={styles.singleImage} key={link}>
                    <img src={link} alt="items-img" />
                    <span>Bill #{index + 1}</span>
                </div>
            ))}
            {images.map((link) => (
                <div className={styles.singleImage} key={link}>
                    <img src={link} alt="items-img" />
                    <span>Rider-Selfie</span>
                </div>
            ))}
        </div>
    );
};
export default RequestImages