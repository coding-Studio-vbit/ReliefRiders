import React from 'react';
import adminrtstyles from "./RequestType.module.css"
import Navbar from '../GlobalComponents/NavigationBar'

function RequestType(){
    return(
        <div style={{display:'grid'}}>
            <Navbar />
            <div className={adminrtstyles.rcontainer}>
                <span>
                    Choose the Type of Request
                </span>
            <button>
          General Request
        </button>
        <button>
          Pickup and Drop
        </button>
      </div>
        </div>
    );
}

export default RequestType;
