import React from 'react';
import styles from './spinner.module.css'
/**
 * 
 * @param {string} radius radius of spinner
 * @returns Spinner component
 */
const Spinner = ({radius}) => {
    return ( 
        <div className={styles.spinner} style={{width:radius+'em',height:radius+'em'}}  >

        </div>
     );
}
 
const LoadingScreen = () => {
    return ( 
        <div className={styles.loadingScreen} >
            <Spinner radius='3' />
        </div>
     );
}
export  {Spinner,LoadingScreen};