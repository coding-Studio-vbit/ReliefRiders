import React from 'react';
import styles from './remarks.module.css'

const Remarks = ({remarks}) => {
    return remarks? ( 
        <>
        <p className={styles.remarksText} >Remarks</p>
        <div className={styles.remarksContainer} >

            {remarks}

        </div>
        </>
     ):null;
}
 
export default Remarks;