import React from 'react';
import './spinner.css'
const Spinner = ({radius}) => {
    return ( 
        <div className="spinner" style={{width:radius+'em',height:radius+'em'}}  >

        </div>
     );
}
 
export default Spinner;