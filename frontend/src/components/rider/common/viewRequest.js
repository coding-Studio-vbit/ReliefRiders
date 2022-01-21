import React, { useContext, useState } from "react";
import styles from "./viewRequest.module.css";
import Navbar from "../../global_ui/nav";
import Button from "../../global_ui/buttons/button";
import axios from "axios";
import { Dialog } from "../../global_ui/dialog/dialog";
import { useHistory } from "react-router-dom";
import UserDetails from "../current_request/user_details";
import Remarks from "../../global_ui/remarks/remarks";
import Address from "../current_request/address";
import { LoadingScreen } from "../../global_ui/spinner";
import Carousel from "../../global_ui/carousel/carousel";
import { AuthContext } from "../../context/auth/authProvider";
import Select from "react-select";

function ViewRequest() {
  const { token } = useContext(AuthContext);
  const history = useHistory();
  const state = history.location.state;
  const [mode,setMode] = useState()
  const [error, seterror] = useState(null);

  const [isLoading, setisLoading] = useState(false);

  const [isDeliveryConfirmed, setisDeliveryConfirmed] = useState(false);

  const makeDelivery = () => {
    setisLoading(true);
    const options = {
      headers: {
        authorization: "Bearer " + token,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_URL}/rider/makeDelivery/${history.location.state.reqObj.requestNumber}/${mode}`,
        options
      )
      .then((response) => {
        console.log(response);
        if (response.data.status == "success") {
          setisLoading(false);
          setisDeliveryConfirmed(true);
        } else {
          setisLoading(false);
          seterror(response.data.message);
        }
      })
      .catch(function (err) {
        setisLoading(false);
        seterror(err);
      });
  };

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <>
      <Navbar
        back="/new_delivery"
        title="Order Details"
        style={{ background: "#79CBC5", color: "white" }}
      />

      <Dialog
        isShowing={error}
        title="Error"
        msg={error}
        onOK={() => {
          seterror(false);
        }}
      />

      <Dialog
        isShowing={isDeliveryConfirmed}
        title="Delivery Confirmed"
        msg={`Delivery Taken Up with requestID ${history.location.state.reqObj.requestNumber}`}
        onOK={() => {
          setisDeliveryConfirmed(false);
          history.push("/current_request");
        }}
      />

      <div className={styles.currentRequestContent}>
        <p className={styles.request}>
          <span>
            RequestID
            <span style={{ fontWeight: "lighter" }}>
              {" "}
              #{state.reqObj.requestNumber}
            </span>
          </span>
        </p>

        <UserDetails
          covid={state.reqObj.requesterCovidStatus}
          name={state.reqObj.requesterID.name}
          phone={state.reqObj.requesterID.phoneNumber}
        />

        <Address request={state.reqObj} />

        <Remarks remarks={state.reqObj.Remarks} />

        <div className={styles.categories}>
          <span style={{}}>Requests</span>

          <div className={styles.orderType}>
            {state.reqObj.itemCategories.map((type) => {
              return (
                <Button
                  fontSize="0.9rem"
                  text={type}
                  key={type}
                  bgColor="#ff7978"
                  color="black"
                  isRounded="true"
                  borderRadius="16px"
                />
              );
            })}
          </div>
        </div>

        {state.reqObj.itemsListList.length > 0 && (
          <div className={styles.itemsListList}>
            <table>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
              </tr>
              {state.reqObj.itemsListList.map((object) => {
                return (
                  <tr key={object.itemName}>
                    <td>{object.itemName}</td>
                    <td>{object.quantity}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        )}

        {state.reqObj.itemsListImages.length > 0 && (
          <Carousel list={state.reqObj.itemsListImages} title="Items" />
        )}

        <div></div>
        {state.reqObj.billsImageList.length > 0 && (
          <Carousel list={state.reqObj.billsImageList} title="Bills" />
        )}
        <Select
          styles={{
            control: (base, state) => ({
              ...base,
              border: state.isFocused
                ? "2px solid var(--primary)"
                : "2px solid #C0C0C0",
              boxShadow: "none",

              "&:hover": {
                border: state.isFocused
                  ? "2px solid var(--primary)"
                  : "2px solid #C0C0C0",
                boxShadow: "none",
              },
              "&:focus": {
                boxShadow: "none",
                border: "2px solid var(--primary)",
              },
            }),
          }}
          placeholder="Mode of transport"
          onChange={(e)=>setMode(e.value)}
          options={[
            { value: "Car", label: "Car" },
            { value: "Motorbike", label: "Motorbike" },
            { value: "Bicycle", label: "Bicycle" },
          ]}
          className={styles.select}
        />
        <div>
          {state.reqObj.requestStatus === "PENDING" && (
            <div
              style={{
                marginTop: "50px",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              <button
                style={{
                    padding:'10px'
                }}
                onClick={() => makeDelivery()}
              >Make Delivery </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ViewRequest;

// const request = {
//     requestNumber: "8628290",
//     requesterID: "8628290",
//     requestStatus: "PENDING",
//     requesterCovidStatus: true,
//     requestType: "GENERAL",
//     name: "Mark Zucc",
//     phoneNumber: "9999999999",
//     itemsListImages: [
//         'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
//         'https://images.pexels.com/photos/2225601/pexels-photo-2225601.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
//         'https://images.pexels.com/photos/2430953/pexels-photo-2430953.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
//     ],
//     riderID: {
//       name: "Someone",
//     },
//     itemsListList: [
//       {
//         itemName: "Tomato",
//         quantity: "2kg",
//       },
//       {
//         itemName: "Zomato",
//         quantity: "2kg",
//       },
//     ],
//     itemCategories: ["MEDICINES", "MISC"],
//     remarks: "Please delivery ASAP here",
//     billsImageList: [
//         'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
//         'https://images.pexels.com/photos/2225601/pexels-photo-2225601.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
//         'https://images.pexels.com/photos/2430953/pexels-photo-2430953.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
//     ],
//     rideImages: [
//       // "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
//     ],
//     pickupLocationAddress: {
//       addressLine: "Some place far away",
//       area: "",
//       city: "Unknown",

//     },
//     dropLocationAddress: {
//         addressLine: "Some place far away",
//         area: "",
//         city: "Unknown",

//       },
//     // {
//     //   addressLine: "Some place far away",
//     //   area: "",
//     //   city: "Unknown",
//     //   pincode: "XXXXXX",
//     // }
//     pickupLocationCoordinates: {
//       coordinates: [17.9, 78.6],
//     },
//     dropLocationCoordinates: {
//       coordinates: [17.9, 78.6],
//     },
//   };
