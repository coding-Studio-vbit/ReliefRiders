import { useEffect } from "react";
import { useReducer } from "react";
import { React, createContext } from "react";
import { useLocation } from "react-router-dom";

const newRequestReducer = (state, action) => {
  switch (action.type) {
    case "REQUEST_TYPE":
      return { ...state, requestType: action.payload };
    case "ADD_CATEGORIES_IMAGES":
      return { ...state, uploadItemsList: true, categories: action.payload, };
    case "ENTER_ITEMS":
      return {
        ...state,
        uploadItemsList: false,
        categories: action.categories,
        itemsList: action.itemsList,
      };
    case "ADD_PICKUP_LOCATION_COORDINATES":
      return { ...state,pickupLocation:{}, pickupLocationCoordinates: action.payload };

    case "ADD_DROP_LOCATION_COORDINATES":
      return { ...state,dropLocation:{}, dropLocationCoordinates: action.payload };
    case "ADD_PICKUP_ADDRESS":
      return { ...state,pickupLocationCoordinates:[], pickupLocation: action.payload };
    case "ADD_DROP_ADDRESS":
      return { ...state,dropLocationCoordinates:[], dropLocation: action.payload};
    
  }
};
const initState = {
  requestType: "",
  categories: [],
  uploadItemsList: false,
  itemsList: [],
  pickupLocation: {},
  dropLocation: {},
  dropLocationCoordinates: [],
  pickupLocationCoordinates: [],
};

export const NewRequestContext = createContext();

export const NewRequestProvider = (prop) => {
  const [state, dispatch] = useReducer(newRequestReducer, initState, () => {
    const data = localStorage.getItem("new_request");
    if (data) return JSON.parse(data);
    else return initState;
  });
  const location = useLocation()
  useEffect(()=>{
    
    localStorage.setItem('draft',location.pathname)
  },[location.pathname])
  useEffect(() => {
    
    localStorage.setItem("new_request", JSON.stringify(state));
  }, [state]);
  return (
    <NewRequestContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {prop.children}
    </NewRequestContext.Provider>
  );
};
