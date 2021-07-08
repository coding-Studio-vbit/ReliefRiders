import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useContext } from "react/cjs/react.development";
import { AuthContext } from "../../../context/auth/authProvider";
import { ConfirmDialog } from "../../../global_ui/dialog/dialog";
import Navbar from "../../../global_ui/nav";
import cancelConfirmRequest from "./cancel_confirm_request";
import ItemsRequestedList from "./items_requested_list";
import styles from "./placed_request.module.css";
import RequestImages from "./request_images";

const PlacedRequest = () => {
  const history = useHistory();
  const { token } = useContext(AuthContext);
  console.log(token);
  const {
    location: {
      state: { request },
    },
  } = history;
  const [dialogData, setDialogData] = useState({ show: false, msg: "" });
  const [cancel, setCancel] = useState(false);
  const statusStyle = {
    color: request.requestStatus === "PENDING" ? "red" : "green",
    fontWeight: "bold",
    fontSize: 1.2 + "em",
  };

  return (
    <>
      <ConfirmDialog
        isShowing={dialogData.show}
        msg={dialogData.msg}
        setDialogData={setDialogData}
        routeRedirect="my_requests"
        onOK={async () => {
          const res = await cancelConfirmRequest(
            token,
            request.requestNumber,
            cancel
          );
          console.log(res);
          if (res !== 1) {
            setDialogData({ show: true, msg: res });
          } else {
            if (cancel)
              setDialogData({ ...dialogData, msg: "Cancelled successfully" });
            else
              setDialogData({ ...dialogData, msg: "Confirmed successfully" });
            history.replace("my_requests");
          }
        }}
      />
      <Navbar
        back="my_requests"
        style={{
          color: "white",
          background: "#79cbc5",
          marginBottom: 0.75 + "em",
        }}
        title="Order Details"
      />
      <div className={styles.container}>
        <p>Request #{request.requestNumber}</p>
        <span>
          Order Status:{" "}
          <span style={statusStyle}> {request.requestStatus}</span>
        </span>

        {request.requestStatus[0] === "D" && (
          <p>Order delivered by {request.riderID.name}</p>
        )}
        <Address />
        {request.itemsListImages.length > 0 ? (
          <RequestImages
            bills={request.billsImageList}
            items={request.itemsListImages}
            images={request.rideImages}
          />
        ) : (
          <>
            <ItemsRequestedList
              styles={styles}
              list={request.itemsListList}
              category={request.itemCategories}
            />
            <RequestImages
              bills={request.billsImageList}
              images={request.rideImages}
            />
          </>
        )}

        {request.requestStatus[0] != "D" && (
          <BottomButton setCancel={setCancel} setDialogData={setDialogData} />
        )}
      </div>
    </>
  );
};

export default PlacedRequest;

const BottomButton = ({ setDialogData, setCancel }) => {
  return (
    <div className={styles.buttonsContainer}>
      <button
        onClick={() => {
          setCancel(true);
          setDialogData({
            show: true,
            msg: "Are you sure you want to cancel",
          });
        }}
      >
        Cancel Request
      </button>
      <button
        onClick={() => {
          setDialogData({
            show: true,
            msg: "Are you sure you want to confirm delivery",
          });
        }}
      >
        Confirm Request
      </button>
    </div>
  );
};

const Address = () => {
  const {
    location: {
      state: { request },
    },
  } = useHistory();
  const type = request.requestType;
  const pickup = request.pickupLocationAddress;
  const drop = request.dropLocationAddress;
  const pCoordinates = request.pickupLocationCoordinates.coordinates;
  const dCoordinates = request.dropLocationCoordinates.coordinates;

  return (
    <div className={styles.addressContainer}>
     
      {type === "GENERAL" ? (
        <div className={styles.address}>
          <span>Address</span>
          {drop ? (
            <>
              <span>{drop.address}</span>
              <span>
                {drop.city} {drop.area}
              </span>
            </>
          ) : (
            <a
              rel="noreferrer"
              href={`https://www.google.com/maps/search/?api=1&query=${dCoordinates[0]},${dCoordinates[1]}`}
              target="_blank"
            >
              Open in google maps
            </a>
          )}
        </div>
      ) : (
        <>
          
          <>
            <span>Pickup Location</span>
            <div className={styles.address}>
              <span>Address</span>
              {pickup ? (
                <>
                  <span>{pickup.address}</span>
                  <span>
                    {pickup.city} {pickup.area}
                  </span>
                </>
              ) : (
                <a
                  rel="noreferrer"
                  href={`https://www.google.com/maps/search/?api=1&query=${pCoordinates[0]},${pCoordinates[1]}`}
                  target="_blank"
                >
                  Open in google maps
                </a>
              )}
            </div>
          </>
           
          <>
            <span>Drop Location</span>
            <div className={styles.address}>
              <span>Address</span>
              {drop ? (
                <>
                  <span>{drop.address}</span>
                  <span>
                    {drop.city} {drop.area}
                  </span>
                </>
              ) : (
                <a
                  rel="noreferrer"
                  href={`https://www.google.com/maps/search/?api=1&query=${dCoordinates[0]},${dCoordinates[1]}`}
                  target="_blank"
                >
                  Open in google maps
                </a>
              )}
            </div>
          </>
          
        </>
      )}
    </div>
  );
};
