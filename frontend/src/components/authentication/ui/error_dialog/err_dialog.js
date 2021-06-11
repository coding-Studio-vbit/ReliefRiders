import React from 'react';
import ReactDOM from 'react-dom';
import './errstyle.css';

const Modal = ({ isShowing, hide, msg}) => isShowing ? ReactDOM.createPortal(
    <React.Fragment>
      <div className="modal-overlay"/>
      <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div className="modal">
          <div className="modal-header">
              <h3>ERROR</h3>
            <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <p>
            {msg}
          </p>
        </div>
      </div>
    </React.Fragment>, document.body
  ) : null;
  
  export default Modal;

