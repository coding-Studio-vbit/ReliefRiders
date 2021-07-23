import React from 'react';
import styles from './remarks.module.css'

const Remarks = ({remarks}) => {
    return ( 
        <>
        <p className={styles.remarksText} >Remarks</p>
        <div className={styles.remarksContainer} >

            {remarks}

        </div>
        </>
     );
}
 
export default Remarks;