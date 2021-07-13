import React, { useState } from "react";
import { useRef } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { Spinner } from "../spinner";
import "./dialog.css";
/**
 * 
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
const Dialog = ({ isShowing, msg, title = "Alert", onOK = () => {} }) => {
  const [inProp, setInProp] = useState(true);
  const nodeRef = useRef(null)
  return isShowing
    ? ReactDOM.createPortal(
        <div id="mw" className="modal-wrapper">
          <CSSTransition
            appear
            nodeRef={nodeRef}
            unmountOnExit
            in={inProp}
            onExited={() => {
              if (!inProp) {
                setInProp(true);
                onOK();
              }
            }}
            key={msg}
            timeout={200}
            classNames="scale-transition"
          >
            <div ref={nodeRef} id="modal" className="modal">
              <h3>{title}</h3>
              <p>{msg}</p>

              <button
              style={{
                gridColumnStart: 1,
                gridColumnEnd: -1,
              }}
                className="modal-close-button"
                onClick={() => {
                  setInProp(false);
                }}
              >
                Okay!
              </button>
            </div>
          </CSSTransition>
        </div>,
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
  onCancel,
  title = "Alert",
  onOK = async () => {},
}) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const onOKCompleted = useRef(false);
  const nodeRef = useRef(null)
  const [makeAlert, setMakeAlert] = useState(false);
  const style = makeAlert
    ? {
        gridColumnStart: 1,
        gridColumnEnd: -1,
      }
    : {};
  const [inProp, setInProp] = useState(true);

  return isShowing
    ? ReactDOM.createPortal(
        <div id="mw" className="modal-wrapper">
          <CSSTransition
            appear
            nodeRef={nodeRef}
            unmountOnExit
            in={inProp}
            onExited={() => {
              if (!inProp) {
                
              
                setInProp(true);
                setDialogData({
                  show: false,
                  msg: "",
                });
                setMakeAlert(false);
                if(onCancel) onCancel()
                onOKCompleted.current = false;
              }
            }}
            key={history.location.key}
            timeout={200}
            classNames="scale-transition"
          >
            <div ref={nodeRef} id="modal" className="modal">
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
                        setInProp(false);
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
                        if (routeRedirect) history.replace(routeRedirect);
                        else {
                          setInProp(false);
                        }
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
          </CSSTransition>
        </div>,
        document.body
      )
    : null;
};

export { Dialog, ConfirmDialog };
