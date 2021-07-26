import React from "react";
import Navbar from "../../global_ui/nav";
import styles from "./RiderProfile.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { Dialog } from "../../global_ui/dialog/dialog";
import { LoadingScreen } from "../../global_ui/spinner";
import { useContext } from "react";
import { AuthContext } from "../../context/auth/authProvider";

const RiderProfile = () => {
  const history = useHistory();
  const [data, setData] = useState({
    name: "",
    phoneNumber: "",
    profileUrl: "",
  });
  const [error, setError] = useState(null);
  const {token} = useContext(AuthContext)
  const [isLoaded, setisLoaded] = useState(false);

  useEffect(async () => {
    const options = {
      headers: {
        authorization: "Bearer " + token,
      },
    };
    axios.get(process.env.REACT_APP_URL+"/rider/profile", options).then(
      (response) => {
        console.log(response);
        if (response.data.status === "success") {
          setData({
            name: response.data.message.name,
            phoneNumber: response.data.message.phoneNumber,
            profileUrl: response.data.message.profileUrl,
          });
          setError(null);
        } else {
          setError(response.data.message);
        }
        setisLoaded(true);
      },
      (error) => {
        console.log("An error occured", error);
        setError(error.message);
        setisLoaded(true);
      }
    );
  }, []);

  return isLoaded ? (
    error ? (
      <Dialog
        isShowing={error}
        onOK={() => {
          history.push("/my_profile");
          setError(false);
        }}
        msg={error}
      />
    ) : (
      <div className={styles.riderProfileContainer}>
        <Navbar back={"/"} title="My Account" />

        {data.profileURL ? (
          <img src={data.profileURL} className={styles.profileImage}></img>
        ) : (
          <div className={styles.profileDummy}></div>
        )}
        <label className={styles.labelHead}>Full Name:</label>
        <span className={styles.name}>{data.name}</span>

        <label className={styles.labelHead}>Phone Number:</label>
        <span className={styles.phoneNumber}>{data.phoneNumber}</span>

        <button
          onClick={() => history.push("/my_profile/edit_profile",{userData:data})}
          style={{
            marginTop: "5rem",
            padding: "0.55em 2em",
          }}
        >
          Edit
        </button>
      </div>
    )
  ) : (
    <LoadingScreen />
  );
};

export default RiderProfile;
