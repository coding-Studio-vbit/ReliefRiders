//
import React from "react";
import { useState } from "react";
import axios from "axios";
import styles from "./editRequesterProfile.module.css";
import InputField from "../../global_ui/input";
import Navbar from "../../global_ui/nav";
import { Dialog } from "../../global_ui/dialog/dialog";
import TextArea from "../../global_ui/textarea/textArea";
import { LoadingScreen } from "../../global_ui/spinner";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth/authProvider";

const EditRequesterProfile = () => {
  const history = useHistory();
  const {
    location: {
      state: { userData },
    },
  } = history;
  const { token } = useContext(AuthContext);
  const [requestError, setRequestError] = useState(null);
  const [isProfileUpdated, setisProfileUpdated] = useState(false);

  const [data, setData] = useState(userData);

  const [isLoaded, setisLoaded] = useState(true);

  const [fullNameError, setfullNameError] = useState(null);
  const [phoneNumberError, setphoneNumberError] = useState(null);
  const [yearOfBirthError, setyearOfBirthError] = useState(null);
  const [addressError, setaddressError] = useState(null);
  const [cityError, setcityError] = useState(null);
  const [areaError, setareaError] = useState(null);

  function updateProfile() {
    setisLoaded(false);
    const options = {
      headers: {
        authorization: "Bearer " + token,
      },
    };
    axios
      .put("http://localhost:8000/requester/profile", data, options)
      .then((response) => {
        if (response.data.status == "success") {
          console.log(response);
          setRequestError(null);
          setisProfileUpdated(true);
        } else {
          throw Error(response.data.message);
        }
        setisLoaded(true);
      })
      .catch((error) => {
        setRequestError(error.toString());
        setisLoaded(true);
      });
  }

  function validateAll() {
    const d = data;
    if (
      validateCity({ target: { value: d.defaultAddress.city } }) &
      validateName({ target: { value: d.name } }) &
      validateArea({ target: { value: d.defaultAddress.area } }) &
      validateYear({ target: { value: d.yearOfBirth } }) &
      validatePhNumber({ target: { value: d.phoneNumber } }) &
      validateAddress({ target: { value: d.defaultAddress.address } })
    ) {
      return true;
    }
    return false;
  }

  const submit = async (event) => {
    event.preventDefault();
    if (validateAll()) {
      updateProfile();
    } else {
      console.log("Update Failed");
    }
  };

  const validatePhNumber = (e) => {
    const phoneNumber = e.target.value;
    const regE = /^[6-9]\d{9}$/;
    let flag = false;

    if (phoneNumber.toString().length > 10) {
      setphoneNumberError("Mobile Number exceeds 10 digits");
    } else if (phoneNumber.toString().length < 10) {
      setphoneNumberError("Mobile Number must contain 10 digits");
    } else if (!regE.test(phoneNumber)) {
      setphoneNumberError("Enter a valid Mobile Number");
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
    const fullName = e.target.value;
    let flag = false;

    if (fullName === "") {
      setfullNameError("Name cannot be Empty");
    } else if (!/^[a-zA-Z .]*$/.test(fullName)) {
      setfullNameError("Name must contain only alphabets");
    } else if (fullName.length < 3) {
      setfullNameError("Name must be atleast 3 characters!");
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

  const validateAddress = (e) => {
    const address = e.target.value;
    let flag = false;

    if (address === "" || address===null) {
      setaddressError("Address cannot be Empty");
    } else {
      setaddressError(null);
      flag = true;
    }
    setData({
      ...data,
      defaultAddress: {
        ...data.defaultAddress,
        address: e.target.value,
      },
    });
    return flag;
  };

  const validateCity = (e) => {
    const city = e.target.value;
    let flag = false;

    if (city === "" || city===null) {
      setcityError("City Name cannot be Empty");
    } else {
      setcityError(null);
      flag = true;
    }
    setData({
      ...data,
      defaultAddress: {
        ...data.defaultAddress,
        city: e.target.value,
      },
    });
    return flag;
  };

  const validateArea = (e) => {
    const area = e.target.value;
    let flag = false;

    if (area === "" || area===null) {
      setareaError("Pincode cannot be empty");
    } else if (area.length > 25) {
      setareaError("Area cannot exceed 25 characters");
    } else {
      setareaError(null);
      flag = true;
    }
    setData({
      ...data,
      defaultAddress: {
        ...data.defaultAddress,
        area: e.target.value,
      },
    });
    return flag;
  };

  const validateYear = (e) => {
    let flag = false;
    const year = e.target.value;
    const cyear = new Date().getFullYear();

    if (!parseInt(year) || parseInt(year) < cyear - 100) {
      setyearOfBirthError("Invalid Year!");
    } else if (parseInt(year) > cyear - 13) {
      setyearOfBirthError("Invalid Year!");
    } else if (year.toString().length == 0) {
      setyearOfBirthError("Enter Year!");
    } else if (year.toString().length != 4) {
      setyearOfBirthError("Invalid yYear");
    } else {
      setyearOfBirthError(null);
      flag = true;
    }
    setData({
      ...data,
      yearOfBirth: e.target.value,
    });
    return flag;
  };

  return isLoaded ? (
    requestError ? (
      <Dialog
        isShowing={requestError}
        onOK={() => {
          setRequestError(false);
          history.replace("/my_profile");
        }}
        msg={requestError}
      />
    ) : (
      <div className={styles.requesterProfileContainer}>
        <Dialog
          title="Profile"
          isShowing={isProfileUpdated}
          onOK={() => {
            setisProfileUpdated(false);
            history.replace("/my_profile");
          }}
          msg={"Profile Updated Successfully"}
        />

        <Navbar
          back="/my_profile"
          title="Edit Profile"
        />

          {data.profileURL ? (
            <img src={data.profileURL} className={styles.profileImage}></img>
          ) : (
            <div className={styles.profileDummy}></div>
          )}
            <form className={styles.editProfileForm} onSubmit={submit}>
          <InputField
            value={data.name}
            type="text"
            maxLength="40"
            placeholder="Name"
            error={fullNameError}
            onChange={validateName}
          />

          <InputField
            value={data.phoneNumber}
            type="number"
            maxLength="10"
            placeholder="Mobile Number"
            error={phoneNumberError}
            onChange={validatePhNumber}
          />

          <InputField
            value={data.yearOfBirth}
            type="number"
            maxLength="4"
            placeholder="Year Of Birth"
            error={yearOfBirthError}
            onChange={validateYear}
          />

          <div className={styles.address}>
            <div className={styles.completeAddress}>
              <TextArea
                value={data.defaultAddress.address}
                placeholder="Address"
                rows="3"
                
                onChange={validateAddress}
                error={addressError}
              />
            </div>

            <div className={styles.area}>
              <InputField
                value={data.defaultAddress.area}
                type="text"
                placeholder="Area"
                error={areaError}
                onChange={validateArea}
              />
            </div>

            <div className={styles.city}>
              <InputField
                value={data.defaultAddress.city}
                type="text"
                placeholder="City"
                error={cityError}
                onChange={validateCity}
              />
            </div>
          </div>
          <button style={{
            padding:'0.65em 1.25em',
            justifySelf:'center',
            fontWeight:'bold'
            
          }} type='submit' onClick={(e) => submit(e)} className="submit">

          Save Changes
        </button>
        </form>
        
      </div>
    )
  ) : (
    <LoadingScreen />
  );
};

export default EditRequesterProfile;
