/* eslint-disable no-unused-vars */
export const fetchCurrentRequest = async (dispatch, token) => {
  console.log("Dummy data");
  console.error(
    "Current request screen may contain bugs. They will be fixed when current req endpoint is done"
  );

  dispatch({ type: "SETREQUEST", payload: request });
  // try {
  //   const res = await fetch("")
  // } catch (error) {

  // }
};

const request = {
  requestNumber: "8628290",
  requesterID: "8628290",
  requestStatus: "PENDING",
  requesterCovidStatus: true,
  requestType: "P&D",
  name: "Mark Zucc",
  phoneNumber: "9999999999",
  itemsListImages: [
    //  "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  ],
  riderID: {
    name: "Someone",
  },
  itemsListList: [
    {
      itemName: "Tomato",
      quantity: "2kg",
    },
    {
      itemName: "Zomato",
      quantity: "2kg",
    },
  ],
  itemCategories: ["MEDICINES", "MISC"],
  remarks: "Please delivery ASAP here",
  billsImageList: [
    // "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  ],
  rideImages: [
    // "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  ],
  pickupLocationAddress: {
    addressLine: "Some place far away",
    area: "",
    city: "Unknown",
    pincode: "XXXXXX",
  },
  dropLocationAddress: null,
  // {
  //   addressLine: "Some place far away",
  //   area: "",
  //   city: "Unknown",
  //   pincode: "XXXXXX",
  // }
  pickupLocationCoordinates: {
    coordinates: [17.9, 78.6],
  },
  dropLocationCoordinates: {
    coordinates: [17.9, 78.6],
  },
};
