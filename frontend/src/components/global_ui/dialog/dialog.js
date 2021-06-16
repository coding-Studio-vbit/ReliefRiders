import React from "react";
import ReactDOM from "react-dom";
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
          <div className="modal-wrapper">
            <div className="modal">
              <h3>{title}</h3>
              <p>{msg}</p>

              {confirmDialog && (
                <button className="modal-close-button" onClick={onCancel}>
                  Cancel
                </button>
              )}
              <button
                style={style}
                className="modal-close-button"
                onClick={() => onOK()}
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

export default Dialog;
