import React from 'react';
import styles from './MyRequests.module.css';

const MyRequestsListItem = (props) => {


    return (
        <div className={styles.myRequestsListItem}>
            <span className={styles.date}> Date: {props.data.date} </span>
            <span className={styles.requestType}>{props.data.requestType}</span>
            {
                (props.data.requestStatus == "DELIVERED" || props.data.requestStatus == "UNDER DELIVERY") ? (<span className={styles.ok}>{props.data.requestStatus}</span>) : (<span className={styles.notOk}>{props.data.requestStatus}</span>)
            }
            {
                props.data.categories.map((category, index) => {
                    switch (category) {
                        case 'MEDICINES': return <span key={index} className={styles.medicines}>Medcines</span>;
                        case 'GROCERIES': return <span key={index} className={styles.groceries}>Groceries</span>;
                        case 'MISC.': return <span key={index} className={styles.misc}>Misc.</span>;
                    }
                })
            }

            <span onClick={(e) => { e.preventDefault() }} className={styles.viewButton}>
                <i className="fas fa-eye"></i>
                View
            </span>
        </div>)
}

export default MyRequestsListItem;