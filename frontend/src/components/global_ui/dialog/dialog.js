import React from "react";
import { useRef } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { Spinner } from "../spinner";
import "./dialog.css";
/**
 * 
 * @param {} confirmDialog : bool. Whether the modal is confirm dialog or not
 * @param {boolean} isShowing: bool. hide or show model using this prop
 * @param {string} msg :string. Message to show
 * @param {String} title: string title of the modal
 * @param {funcion} onOk function to execute when OK is pressed
 * @param {function} onCancel function to execute when CANCEL is pressed
 *  @returns if confirmDialog is passed returns Confirm Dialog else an alert dialog

 * USAGE
 * 
 * You need a state variable like isShowing in where you want to display a dialog.
 * 
 *  eg : const [isShowing,toggle] = useState(false)
 * 
 * Now pass this isShowing to Dialog and make sure onOK/onCancel call toggle(false) inside them.
 * 
 * eg : <Dialog  isShowing={isShowing} onOK={()=>{toggle(false)}} msg={error} />
 *
 * Now to show the dialog call toggle(true) (Now dialog will be displayed 😀 )

 */
const Dialog = ({
  confirmDialog,
  isShowing,
  msg,
  title = "Alert",
  onOK = () => {},
  onCancel = () => {},
}) => {
  const style = !confirmDialog
    ? {
        gridColumnStart: 1,
        gridColumnEnd: -1,
      }
    : {};

  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div id="mw" className="modal-wrapper">
            <div id="modal" className="modal">
              <h3>{title}</h3>
              <p>{msg}</p>

              {confirmDialog && (
                <button
                  className="modal-close-button"
                  onClick={() => {
                    document
                      .getElementById("mw")
                      .classList.add("modal-wrapper-b");

                    document.getElementById("modal").classList.add("modal-b");
                    setTimeout(() => onCancel(), 250);
                  }}
                >
                  Cancel
                </button>
              )}
              <button
                style={style}
                className="modal-close-button"
                onClick={() => {
                  document
                    .getElementById("mw")
                    .classList.add("modal-wrapper-b");

                  document.getElementById("modal").classList.add("modal-b");
                  setTimeout(() => onOK(), 250);
                }}
              >
                Okay!
              </button>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
};
/**
 *
 * Same as Dialog, but except you need to pass setDialogData and routeRedirect (takes you to that path after confirming)
 * EG:
 *      const [dialogData,setDialogData] = useState({show:false,msg:""})
 *
 * Refer Placed_requests.js for better understanding
 * @returns
 */
const ConfirmDialog = ({
  isShowing,
  msg,
  setDialogData,
  routeRedirect,
  title = "Alert",
  onOK = async () => {},
}) => {
  const history = useHistory()
  const [loading, setLoading] = useState(false);
  const onOKCompleted = useRef(false);
  const [makeAlert, setMakeAlert] = useState(false);
  const style = makeAlert
    ? {
        gridColumnStart: 1,
        gridColumnEnd: -1,
      }
    : {};

  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div id="mw" className="modal-wrapper">
            <div id="modal" className="modal">
              <h3>{title}</h3>
              {loading ? (
                <span className="spinnerModal">
                  <Spinner radius="2" />
                </span>
              ) : (
                <p>{msg}</p>
              )}

              {!loading && (
                <>
                  {!makeAlert && (
                    <button
                      className="modal-close-button"
                      onClick={() => {
                        document
                          .getElementById("mw")
                          .classList.add("modal-wrapper-b");
                        document
                          .getElementById("modal")
                          .classList.add("modal-b");

                        setTimeout(
                          () =>
                            setDialogData({
                              show: false,
                              msg: "",
                            }),
                          250
                        );
                      }}
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    style={style}
                    className="modal-close-button"
                    onClick={async () => {
                      if (onOKCompleted.current) {
                        document
                          .getElementById("mw")
                          .classList.add("modal-wrapper-b");
                        document
                          .getElementById("modal")
                          .classList.add("modal-b");
                       
                        setTimeout(() => {
                          if(routeRedirect) history.replace(routeRedirect)
                          else{
                            setDialogData({
                              show: false,
                              msg: "",
                             
                            });
                            setMakeAlert(false);
                            onOKCompleted.current = false;
                          }
                           
                        }, 250);
                      } else {
                        setLoading(true);
                        await onOK();
                        onOKCompleted.current = true;
                        setLoading(false);
                        setMakeAlert(true);
                      }
                    }}
                  >
                    Okay!
                  </button>
                </>
              )}
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
};

export { Dialog, ConfirmDialog };
