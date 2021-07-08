import { useEffect } from "react";
import { useReducer } from "react";
import { React, createContext } from "react";
import { useLocation } from "react-router-dom";

const newRequestReducer = (state, action) => {
  switch (action.type) {
    case "REQUEST_TYPE":
      return { ...state, requestType: action.payload ,leftOffRoute:action.leftOffRoute};
    case "ADD_CATEGORIES_IMAGES":
      return { ...state, uploadItemsList: true, categories: action.payload,leftOffRoute:action.leftOffRoute };
    case "LEFT_OFF_ROUTE":
      return {...state,leftOffRoute:action.payload}
    case "ENTER_ITEMS":
      return {
        ...state,
        uploadItemsList: false,
        leftOffRoute:action.leftOffRoute,
        categories: action.categories,
        itemsList: action.itemsList,
      };
    case "ADD_PICKUP_LOCATION_COORDINATES":
      return { ...state, pickupLocationCoordinates: action.payload };

    case "ADD_DROP_LOCATION_COORDINATES":
      return { ...state, dropLocationCoordinates: action.payload };
    case "ADD_PICKUP_ADDRESS":
      return { ...state, pickupLocation: action.payload };
    case "ADD_DROP_ADDRESS":
      return { ...state, dropLocation: action.payload,leftOffRoute:action.leftOffRoute };
    
  }
};
const initState = {
  requestType: "",
  categories: [],
  uploadItemsList: false,
  itemsList: [],
  pickupLocation: {},
  dropLocation: {},
  leftOffRoute:'new_request',
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
  }, [state,location.pathname]);
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
