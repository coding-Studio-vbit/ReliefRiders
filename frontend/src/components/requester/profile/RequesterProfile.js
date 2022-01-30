import React from "react";
import Navbar from "../../global_ui/nav";
import styles from "./RequesterProfile.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

import { LoadingScreen } from "../../global_ui/spinner";
import { Dialog } from "../../global_ui/dialog/dialog";
import { useContext } from "react";
import { AuthContext } from "../../context/auth/authProvider";

const RequesterProfile = () => {
  const history = useHistory();
  const [data, setData] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    yearOfBirth: "",
    profileURL: "",
  });
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);
  const [isLoaded, setisLoaded] = useState(false);

  useEffect(async () => {
    const options = {
      headers: {
        authorization: "Bearer " + token,
      },
    };
    axios.get(process.env.REACT_APP_URL + "/requester/profile", options).then(
      (response) => {
        console.log(response);
        if (response.data.status === "success") {
          setData({
            ...response.data.message,
          });

          setError(null);
        } else {
          setError(response.data.message);
        }
        setisLoaded(true);
      },
      (error) => {
        console.error("An error occured", error);
        setError(error.toString());
        setisLoaded(true);
      }
    );
  }, []);

  return isLoaded ? (
    <div className={styles.requesterProfileContainer}>
      <Dialog
        isShowing={error}
        onOK={() => {
          history.push("/");
        }}
        msg={"Unable to Load Profile"}
      />
      <Navbar back="/" title="Profile" />

      {data.profileURL ? (
        <img src={data.profileURL} className={styles.profileImage}></img>
      ) : (
        <div className={styles.profileDummy}></div>
      )}

      <label>Full Name</label>
      <span>{data.name}</span>

      <label>Phone Number</label>
      <span>{data.phoneNumber}</span>

      <label>Address</label>
      {data.defaultAddress.address ? (
        <span>
          {data.defaultAddress.address} , {data.defaultAddress.area},{" "}
          {data.defaultAddress.city}.
        </span>
      ) : (
        <span>Address Not Updated</span>
      )}

      <label>Year Of Birth</label>
      <span>{data.yearOfBirth}</span>

      <button
        style={{
          fontWeight: "bold",
          marginTop: "24px",
          padding:'0.5em 1.25em'
        }}
        onClick={() => history.push("/my_profile/edit_profile",{userData:data})}
      >
        EDIT
      </button>
    </div>
  ) : (
    <LoadingScreen />
  );
};

export default RequesterProfile;
