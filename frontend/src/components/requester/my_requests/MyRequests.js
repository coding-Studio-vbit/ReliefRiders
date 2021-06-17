import React, { useEffect, useState } from 'react';
import MyRequestsListItem from './MyRequestsListItem'
import styles from "./MyRequests.module.css";
import Navbar from '../../global_ui/nav';
import axios from 'axios';
import Dialog from '../../global_ui/dialog/dialog';
import { useHistory } from 'react-router-dom';

const MyRequests = () => {
    const history = useHistory();
    const [allRequests, setRequests] = useState([]);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token')
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
                }, error => {
                    console.log("An error occured", error);
                    //show dialog box.
                    setError(error);
                })

        }, [])

    return (error ? (<Dialog isShowing={true} onOK={() => { history.push("/home/requester") }} msg={JSON.stringify(error.message)} />
    ) : (
        <div>
            <Navbar back={true} backStyle={{ color: 'white' }} title="My Requests" titleStyle={{ color: 'white' }} style={{ backgroundColor: '#79CBC5', marginBottom: "10px" }} />
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
        </div>)

    )
}

export default MyRequests;