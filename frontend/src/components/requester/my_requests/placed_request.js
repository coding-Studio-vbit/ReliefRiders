import React from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../../global_ui/nav";
import styles from "./placed_request.module.css";


const PlacedRequest = () => {
  const history = useHistory()
  const {
    location: {
      state: { request },
    },
  } = history
  const statusStyle = {
    color: request.requestStatus === "PENDING" ? "red" : "green",
    fontWeight: "bold",
    fontSize: 1.2 + "em",
  };
  return (
    <>
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
        <Address
          pickup={request.pickupLocationAddress}
          drop={request.dropLocationAddress}
          type={request.requestType}
        />
        {request.itemsListImages.length > 0 ? (
          <ItemsRequestedImagesAndOthers
            bills={request.billsImageList}
            items={request.itemsListImages}
            images={request.rideImages}
          />
        ) : (
          <>
            <ItemsRequestedList
              list={request.itemsListList}
              category={request.itemCategories}
            />
            <ItemsRequestedImagesAndOthers
              bills={request.billsImageList}
              images={request.rideImages}
            />
          </>
        )}

        {request.requestStatus[0] != "D" && <BottomButton />}
      </div>
    </>
  );
};

export default PlacedRequest;

const BottomButton = () => {
  return (
    <div className={styles.buttonsContainer}>
      <button>Cancel Request</button>
      <button>Confirm Request</button>
    </div>
  );
};

const ItemsRequestedImagesAndOthers = ({ bills, images, items = [] }) => {
  return (
    <div className={styles.imagesContainer}>
      {items.map((link) => (
        <div className={styles.singleImage} key={link}>
          <img src={link} alt="items-img" />
          <span>Items</span>
        </div>
      ))}
      {bills.map((link, index) => (
        <div className={styles.singleImage} key={link}>
          <img src={link} alt="items-img" />
          <span>Bill #{index + 1}</span>
        </div>
      ))}
      {images.map((link) => (
        <div className={styles.singleImage} key={link}>
          <img src={link} alt="items-img" />
          <span>Rider-Selfie</span>
        </div>
      ))}
    </div>
  );
};

const ItemsRequestedList = ({ list, category }) => {
  return (
    <div className={styles.requested}>
      <span className={styles.irItems}>Items Requested</span>

      <div className={styles.category}>
        {category.map((cat) => (
          <span
            className={cat[1] === "E" ? styles.catGreen : styles.catGray}
            key={cat}
          >
            {cat}
          </span>
        ))}
      </div>
      <div className={styles.items}>
        {list.map((item) => (
          <span key={item.itemName}>
            {item.itemName} - {item.quantity}
          </span>
        ))}
      </div>
    </div>
  );
};

const Address = ({ type, pickup, drop }) => {
  return (
    <div className={styles.addressContainer}>
      {type === "P&D" && <span>Pickup Location</span>}
      <div className={styles.address}>
        <span>Address</span>
        <span>{pickup.addressLine}</span>
        <span>
          {pickup.city} {pickup.pincode}
        </span>
      </div>
      {drop && (
        <>
          <span>Drop Location</span>
          <div className={styles.address}>
            <span>Address</span>
            <span>{pickup.addressLine}</span>
            <span>
              {pickup.city} {pickup.pincode}
            </span>
          </div>
        </>
      )}
    </div>
  );
};
