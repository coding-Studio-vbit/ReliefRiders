import React from 'react';
import Navbar from '../../global_ui/nav';
import styles from "./RiderProfile.module.css"
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from '../../global_ui/buttons/button';
import { Dialog } from '../../global_ui/dialog/dialog';
import { LoadingScreen } from '../../global_ui/spinner';

const RiderProfile = () => {
    const history = useHistory();
    const [data, setData] = useState({ name: '', phoneNumber: '', profileUrl: '' });
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
    const [isLoaded, setisLoaded] = useState(false);

    useEffect(
        async () => {
            console.log(token)
            const options = {
                headers: {
                    'authorization': 'Bearer ' + token
                }
            }
            axios.get('http://localhost:8000/rider/profile', options)
                .then(response => {
                    console.log(response);
                    if (response.data.status === "success") {
                        setData({
                            name: response.data.message.name,
                            phoneNumber: response.data.message.phoneNumber,
                            profileUrl: response.data.message.profileUrl
                        })
                        setError(null)
                    } else {
                        setError(response.data.message)
                    }
                    setisLoaded(true);
                }, error => {
                    console.log("An error occured", error);
                    setError(error.message);
                    setisLoaded(true);
                })
        }, [])

    return (
        isLoaded ?
            (
                error ?
                    <Dialog
                        isShowing={error}
                        onOK={() => {
                            history.push("/my_profile")
                            setError(false)
                        }}
                        msg={error} />
                    :
                    <div className={styles.riderProfileContainer}>

                        <Navbar back={"/"} backStyle={{ color: 'white' }} title="My Account" titleStyle={{ color: 'white' }} style={{ backgroundColor: '#79CBC5', marginBottom: "10px" }} />

                        <img className={styles.profileImage} src={data.profileUrl}></img>

                        <label className={styles.labelHead}>Full Name:</label>
                        <span className={styles.name} >
                            {data.name}
                        </span>

                        <label className={styles.labelHead}>Phone Number:</label>
                        <span className={styles.phoneNumber}>
                            {data.phoneNumber}
                        </span>

                        <Button
                            bgColor="green"
                            isRounded="true"
                            text="EDIT"
                            fontSize="17px"
                            onClick={() => history.push('/my_profile/edit_profile')}
                        />

                    </div>
            )
            :
            <LoadingScreen />
    )
};

export default RiderProfile;