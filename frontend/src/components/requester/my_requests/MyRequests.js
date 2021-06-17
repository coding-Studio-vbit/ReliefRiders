import React, { useContext, useEffect, useState } from 'react';
import MyRequestsListItem from './MyRequestsListItem'
import styles from "./MyRequests.module.css";
import Navbar from '../../global_ui/nav';
import axios from 'axios';
import { AuthContext } from '../../context/auth/authProvider';
import Dialog from '../../global_ui/dialog/dialog';

const MyRequests = () => {

    const [allRequests, setRequests] = useState([]);
    const { token } = useContext(AuthContext);
    useEffect(
        () => {
            console.log(token)
            const options = {
                headers: {
                    'authorization': 'Bearer ' + token
                }
            }
            axios.get('http://localhost:8000/requester/myRequests', options)
                .then(response => {
                    setRequests(response.data.message);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log("An error occured", error);
                    //show dialog box.
                    <Dialog confirmDialog={false} isShowing={true} onOk={() => { history.push("/requester/home") }} />
                })
        }
    )

    return (
        <div>
            <Navbar title="My Requests" style={{ backgroundColor: '#79CBC5', marginBottom: "10px" }} />
            <div className={styles.myRequestsList}>
                {
                    allRequests.map((request) => {
                        <MyRequestsListItem data={request} />
                    })
                }
                <MyRequestsListItem data={

                    {
                        date: "16/06/2021",
                        requestType: "DUMMY",
                        requestStatus: "DELIVERED",
                        categories: ['GROCERIES', 'MEDICINES', 'MISC.']
                    }
                } />
                <MyRequestsListItem data={

                    {
                        date: "16/06/2021",
                        requestType: "DUMMY",
                        requestStatus: "DELIVERED",
                        categories: ['GROCERIES', 'MEDICINES', 'MISC.']
                    }
                } />
            </div>
        </div>

    )
}

export default MyRequests;