import React, { useEffect, useReducer, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth/authProvider";
import { ConfirmDialog } from "../../global_ui/dialog/dialog";
import ImgInput from "../../global_ui/Imginput/ImgInput";
import Navbar from "../../global_ui/nav";
import CheckList from "./check_list";
import { fetchCurrentRequest } from "./fetch_current_request";
import Address from "./address";
import styles from "./current_request.module.css";
import UserDetails from "./user_details";
import { LoadingScreen } from "../../global_ui/spinner";
import PreviewImages from "./preview_images";
import Remarks from "../../global_ui/remarks/remarks";
import { useSessionStorageState } from "../../../utils/useLocalStorageState";
import { finishRequest } from "./finish_request";
import { useHistory } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "SETERROR":
      return { ...state, errorMsg: action.payload };
    case "SETLOADING":
      return { ...state, loading: !state.loading };
    case "SETITEMS":
      return { ...state, items: [...state.items, action.payload] };
    case "REMOVEITEMS": {
      const items = state.items;
      items.splice(action.payload, 1);
      console.log(items);
      return { ...state, items: [...items] };
    }
    
    case "SETREQUEST":
      return { ...state, request: action.payload, loading: false };
  }
};
const initState = {
  loading: true,
  errorMsg: "",
  items: [],
  request: null,
};

const sessionKey = "current_request";

export const CurrentRequest = () => {
  const [state, dispatch] = useReducer(reducer, initState, () => {
    const request = sessionStorage.getItem(sessionKey);
    if (request) return { ...initState, request: JSON.parse(request) };
    else return initState;
  });
  const request = state.request;
  const history = useHistory()
  const { token } = useContext(AuthContext);

  const [dialogData, setDialogData] = useState({ show: false, msg: "" });
  const [cancel, setCancel] = useState(false);
  const [bills,setBills] = useSessionStorageState('b-images',[])
  const [images,setImages] = useSessionStorageState('i-images',[])
  
  useEffect(() => {
    sessionStorage.setItem(sessionKey, JSON.stringify(state.request));
  }, [state.request]);

  useEffect(async () => {

    if(request){
      dispatch({type:'SETLOADING'})
    }else
    await fetchCurrentRequest(dispatch, token);
  }, []);

  return state.loading ? (
    <LoadingScreen />
  ) : (
    <>
      <ConfirmDialog
        isShowing={dialogData.show}
        msg={dialogData.msg}
        setDialogData={setDialogData}
        onCancel={() => setCancel(false)}
        // routeRedirect="/"
        onOK={async () => {
            
          
            const res = await finishRequest(token,cancel)
            if (res !== 1) {
              setDialogData({ ...dialogData, msg: res });
            } else {
              if (cancel)
                setDialogData({ ...dialogData, msg: "Cancelled successfully" });
              else
                setDialogData({ ...dialogData, msg: "Confirmed successfully" });
              history.replace("/");
            }
        }}
      />
      <Navbar back="/" title="Order Details" />
      <div className={styles.container}>

        <p>Request #{request.requestNumber}</p>

        <UserDetails
          covid={request.requesterCovidStatus}
          name={request.name}
          phone={request.phoneNumber}
        />

        <Address request={request} />

        <Remarks remarks={request.remarks} />

        {request.itemsListImages.length === 0 ? (
          <CheckList
            dispatch={dispatch}
            category={request.itemCategories}
            items={request.itemsListList}
          />
        ) : (
          
          <PreviewImages title='Items Requested' images={request.itemsListImages} />
          
        )}

        <ImgInput key={'wjhbdwiuybdwb;'} setImages={setBills} imgHeader="Bills" imgText="Tap to add bills" />
        <PreviewImages setImages= {setBills} title='Selected Bills' imgWidth='80px' images={bills} />
        
        <ImgInput key={'hbdhwbijh'} setImages={setImages} imgHeader="Upload Images" imgText="Tap to add images" />
        <PreviewImages setImages= {setImages} title="Selected Images" images={images} imgWidth='80px' />

        <BottomButtons setCancel={setCancel} setDialogData={setDialogData} />
      </div>
    </>
  );
};

const BottomButtons = ({ setDialogData, setCancel }) => {
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
        Cancel Delivery
      </button>
      <button
        onClick={() => {
          setDialogData({
            show: true,
            msg: "Are you sure you want to finish the delivery",
          });
        }}
      >
        Finish Delivery
      </button>
    </div>
  );
};
