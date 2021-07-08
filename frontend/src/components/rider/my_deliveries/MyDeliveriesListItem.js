import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './MyDeliveries.module.css';

const MyDeliveriesListItem = (props) => {

    const routes = useHistory()
    return (
        <div onClick={() => {
            routes.push("my_deliveries/" + props.data.requestNumber, {
                request: props.data
            })
        }} className={styles.myDeliveriesListItem}>
            <span className={styles.date}> Date: {props.data.date} </span>
            <span className={styles.requestType}>{props.data.requestType}</span>
            {
                (props.data.requestStatus == "DELIVERED" || props.data.requestStatus == "UNDER DELIVERY") ? (<span className={styles.ok}>{props.data.requestStatus}</span>) : (<span className={styles.notOk}>{props.data.requestStatus}</span>)
            }
            {
                props.data.itemCategories.map((category, index) => {
                    switch (category) {
                        case 'MEDICINES': return <span key={index} className={styles.medicines}>Medcines</span>;
                        case 'GROCERIES': return <span key={index} className={styles.groceries}>Groceries</span>;
                        case 'MISC.': return <span key={index} className={styles.misc}>Misc.</span>;
                    }
                })
            }

            <span className={styles.viewButton}>
                <i className="fas fa-eye"></i>
                View
            </span>
        </div>)
}

export default MyDeliveriesListItem