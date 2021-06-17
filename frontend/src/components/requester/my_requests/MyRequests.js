import React, { useContext, useEffect } from 'react';
import MyRequestsListItem from './MyRequestsListItem'
import styles from "./MyRequests.module.css";
import Navbar from '../../global_ui/nav';
import axios from 'axios';
import { AuthContext } from '../../context/auth/authProvider';

const MyRequests = () => {

    // const [allRequests, setRequests] = useState([]);
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
                    console.log(response.data);
                })
        }
    )


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