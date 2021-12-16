import React, { useState } from "react";
import styles from "./editRiderProfile.module.css";
import axios from "axios";
import InputField from "../../global_ui/input";
import Navbar from "../../global_ui/nav";
import { Dialog } from "../../global_ui/dialog/dialog";
import { LoadingScreen } from "../../global_ui/spinner";
import { useHistory } from "react-router";

const EditRiderProfile = () => {
  const history = useHistory();
  const {
    location: {
      state: { userData },
    },
  } = history;
  const [requestError, setRequestError] = useState(null);
  const token = localStorage.getItem("token");
  const [isLoaded, setisLoaded] = useState(true);
  const [isProfileUpdated, setisProfileUpdated] = useState(false);

  const [data, setData] = useState(userData);

  const [fullNameError, setfullNameError] = useState(null);
  const [phoneNumberError, setphoneNumberError] = useState(null);

  

  function updateProfile() {
    setisLoaded(false);
    const options = {
      headers: {
        authorization: "Bearer " + token,
      },
    };

    axios
      .put("http://localhost:8000/rider/profile", data, options)
      .then((response) => {
        console.log(response);
        if (response.data.status === "success") {
          console.log("Profile Updated");
          setRequestError(null);
          setisProfileUpdated(true);
        } else {
          setRequestError(response.data.message);
        }
        setisLoaded(true);
      })
      .catch((error) => {
        setRequestError(error.message);
        setisLoaded(true);
      });
  }

  const submit = (event) => {
    event.preventDefault();
    const d = data;

    if (
      validateName({ target: { value: d.name } }) &
      validatePhoneNumber({ target: { value: d.phoneNumber } })
    ) {
      updateProfile();
    }
  };

  const validatePhoneNumber = (e) => {
    let flag = false;
    const phoneNumber = e.target.value;
    const regE = /^[6-9]\d{9}$/;
    if (phoneNumber.length > 10) {
      setphoneNumberError("Phone number exceeds 10 digits");
    } else if (!regE.test(phoneNumber)) {
      setphoneNumberError("Enter a valid mobile number");
    } else {
      setphoneNumberError(null);
      flag = true;
    }

    setData({
      ...data,
      phoneNumber: e.target.value,
    });
    return flag;
  };

  const validateName = (e) => {
    let flag = false;
    const fullName = e.target.value;
    if (fullName === "") {
      setfullNameError("Enter your name");
    } else if (fullName.length < 3) {
      setfullNameError("Name must be atleast 3 characters!");
    } else if (fullName.length > 16) {
      setfullNameError("Name must not exceed 16 characters!");
    } else if (!/^[a-zA-Z .]{3,16}$/.test(fullName)) {
      setfullNameError("Name can only contain alphabets");
    } else {
      setfullNameError(null);
      flag = true;
    }
    setData({
      ...data,
      name: e.target.value,
    });
    return flag;
  };
  return isLoaded ? (
    requestError ? (
      <Dialog
        isShowing={requestError}
        onOK={() => {
          setRequestError(false);
          //history.push("/home/requester")
        }}
        msg={requestError}
      />
    ) : (
      <div className={styles.riderProfileContainer}>
        <Dialog
          title="Profile"
          isShowing={isProfileUpdated}
          onOK={() => {
            setisProfileUpdated(false);
            console.log(isProfileUpdated, 100);
            history.replace("/my_profile");
          }}
          msg={"Profile Updated Successfully"}
        />

        <Navbar back={"/my_profile"} title="Edit Profile" />
        {data.profileURL ? (
          <img src={data.profileURL} className={styles.profileImage}></img>
        ) : (
          <div className={styles.profileDummy}></div>
        )}
        <form className={styles.editRiderProfileForm} onSubmit={submit}>
          <InputField
            value={data.name}
            type="text"
            maxLength="40"
            placeholder="Enter your name"
            error={fullNameError}
            onChange={(e) => validateName(e)}
          />

          <InputField
            value={data.phoneNumber}
            type="number"
            maxLength="10"
            placeholder="Mobile Number"
            error={phoneNumberError}
            // onChange={(e) => validatePhoneNumber(e)}
            // isDisabled={true}
          />


          <button onClick={(e) => submit(e)} style={{
            marginTop:'5rem',
            padding:'0.55em 2em'
          }}>
            Save Changes
          </button>
        </form>
      </div>
    )
  ) : (
    <LoadingScreen />
  );
};

export default EditRiderProfile;
