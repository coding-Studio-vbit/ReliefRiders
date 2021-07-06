import { useEffect } from "react";
import { useReducer } from "react";
import { React, createContext } from "react";

const newRequestReducer = (state, action) => {
  switch (action.type) {
    case "REQUEST_TYPE":
      return { ...state, requestType: action.payload };
    case "INIT":
      return { ...state, ...action.payload };
  }
};
const initState = {
  requestType: "",
  uploadItemsList: null,
};

export const NewRequestContext = createContext();

export const NewRequestProvider = (prop) => {
  const [state, dispatch] = useReducer(newRequestReducer, initState, () => {
    const data = localStorage.getItem("new_request");
    if (data) return JSON.parse(data);
    else return initState;
  });
  useEffect(() => {
    localStorage.setItem("new_request", JSON.stringify(state));
  }, [state]);
  return (
    <NewRequestContext.Provider
      value={{
        requestType: state.requestType,
        dispatch,
      }}
    >
      {prop.children}
    </NewRequestContext.Provider>
  );
};
