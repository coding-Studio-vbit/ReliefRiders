import React from 'react';
import Navbar from '../../global_ui/nav';
import styles from "./RequesterProfile.module.css"
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from '../../global_ui/buttons/button'

import { LoadingScreen } from '../../global_ui/spinner';
import { Dialog } from '../../global_ui/dialog/dialog';

const RequesterProfile = () => {
    const history = useHistory();
    const [data, setData] = useState({
        fullName: '',
        phoneNumber: '',
        address: '',
        yearOfBirth: '',
        profileURL: ''
    });
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token')
    const [isLoaded, setisLoaded] = useState(false);

    useEffect(
        async () => {
            const options = {
                headers: {
                    'authorization': 'Bearer ' + token
                }
            }
            axios.get('http://localhost:8000/requester/profile', options)
                .then(response => {
                    console.log(response);
                    if (response.data.status === "success") {

                        const { defaultAddress } = response.data.message;
                        const { city, address, area } = defaultAddress;
                        const addressValue = (!city) ? ("<Not set>") : ([address, area, city].join(","));
                        setData({
                            fullName: response.data.message.name,
                            phoneNumber: response.data.message.phoneNumber,
                            address: addressValue,
                            yearOfBirth: response.data.message.yearOfBirth,
                            profileURL: (response.data.message.profileURL)?(response.data.message.profileURL):("https://s.yimg.com/os/creatr-uploaded-images/2021-02/572c4830-721d-11eb-bb63-96959c3b62f2")
                        });
                        setError(null)
                    }
                    else {
                        setError(response.data.message)
                    }
                    setisLoaded(true);
                }, error => {
                    console.log("An error occured", error);
                    setError(error.toString());
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
                            setError(false)
                            history.push("/my_profile")
                        }}
                        msg={"Unable to Load Profile"} />
                    :
                    <div className={styles.requesterProfileContainer}>

                        <Navbar back={"/"} backStyle={{ color: 'white' }} title="My Account" titleStyle={{ color: 'white' }} style={{ backgroundColor: '#79CBC5', marginBottom: "10px" }} />

                        <img src={data.profileURL} className={styles.profileImage} ></img>

                        <label className={styles.labelHeader}>Full Name</label>
                        <span className={styles.dataContainer}>
                            {data.fullName}
                        </span>

                        <label className={styles.labelHeader}>Phone Number</label>
                        <span className={styles.dataContainer}>
                            {data.phoneNumber}
                        </span>

                        <label className={styles.labelHeader}>Address</label>
                        <span className={styles.dataContainer}>
                            {data.address}
                        </span>

                        <label className={styles.labelHeader}>Year Of Birth</label>
                        <span className={styles.dataContainer}>
                            {data.yearOfBirth}
                        </span>

                        <div></div>

                        <Button
                            bgColor="green"
                            isRounded="true"
                            text="EDIT"
                            fontSize="17px"
                            customClass={{ letterSpacing: '1px' }}
                            onClick={() => history.push('/my_profile/edit_profile')}
                        />

                    </div>
            )
            :
            <LoadingScreen />
    )
};

export default RequesterProfile;