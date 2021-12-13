import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './MyRequests.module.css';

const MyRequestsListItem = (props) => {

    const routes = useHistory()
    return (
        <div onClick={() => {
            routes.push("my_requests/" + props.data.requestNumber, {
                request: props.data
            })
        }} 
        className={styles.myRequestsListItem}>
            <div className={styles.rowTwo}>
                <span className={styles.date}> Order Date : {props.data.date} </span>                
                <span className={styles.date}>Status  
                {
                    (props.data.requestStatus == "DELIVERED" || props.data.requestStatus == "UNDER DELIVERY") ? 
                    (<span className={styles.ok}>{"     "+props.data.requestStatus}</span>) :
                    (<span className={styles.notOk}>{"     "+props.data.requestStatus}</span>)
                }
                </span>
            </div>

            <div className={styles.rowTwo}>
                <span className={styles.date}>Request Type </span> 
                <span className={styles.requestType}> {props.data.requestType}</span>
            </div>

            <div className={styles.rowTwo}>
                <span className={styles.date}>Requester Status</span> 
                <span className={styles.covidStatus}>{props.data.requesterCovidStatus ?"COVID+":"COVID-FREE"}</span>
            </div>

            <div className={styles.rowTwo}>
                <span className={styles.date}>Ordered Items</span>
                <span>
                    {
                        props.data.itemCategories.map((category, index) => {
                            switch (category) {
                                case 'MEDICINES': 
                                return <span key={index} className={styles.medicines}>Medcines</span>;
                                case 'GROCERIES': 
                                return <span key={index} className={styles.groceries}>Groceries</span>;
                                case 'MISC': 
                                return <span key={index} className={styles.misc}>Misc.</span>;
                            }
                        })
                    }
                </span>
            </div>

        </div>
        )
}

export default MyRequestsListItem