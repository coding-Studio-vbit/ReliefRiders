import React from 'react';
import './nav.css'
const Navbar = ({title,style}) => {
    return ( 
        <nav 
        className="nav-bar"
        style={style}>
            <h3>
                  {title}
            </h3>
        </nav>
     );
}
 
export default Navbar;