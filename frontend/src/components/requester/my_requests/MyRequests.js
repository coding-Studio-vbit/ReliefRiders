import React from 'react';
import MyRequestsListItem from './MyRequestsListItem'
import styles from "./MyRequests.module.css";
import Navbar from '../../global_ui/nav';

const MyRequests = () => {

    return (

        <div>
            <Navbar title="My Requests" />
            <div className={styles.myRequestsList}>
                <MyRequestsListItem data={

                    {
                        date: "16/06/2021",
                        requestType: "GENERAL",
                        requestStatus: "DELIVERED",
                        categories: ['GROCERIES', 'MEDICINES', 'MISC.']
                    }
                } />
                <MyRequestsListItem data={

                    {
                        date: "16/06/2021",
                        requestType: "GENERAL",
                        requestStatus: "DELIVERED",
                        categories: ['GROCERIES', 'MEDICINES', 'MISC.']
                    }
                } />
                <MyRequestsListItem data={

                    {
                        date: "16/06/2021",
                        requestType: "GENERAL",
                        requestStatus: "DELIVERED",
                        categories: ['GROCERIES', 'MEDICINES', 'MISC.']
                    }
                } />
                <MyRequestsListItem data={

                    {
                        date: "16/06/2021",
                        requestType: "GENERAL",
                        requestStatus: "DELIVERED",
                        categories: ['GROCERIES', 'MEDICINES', 'MISC.']
                    }
                } />

            </div>
        </div>

    )
}

export default MyRequests;