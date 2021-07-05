import React from 'react';
import { useHistory } from 'react-router-dom';
import './nav.css'
/**
 * 
 * style : style object : style for nav
 * 
 * back  : boolean : displays back button
 * 
 * backStyle : style object : style for back button
 * 
 * title : string : Title for navbar (default:UNSET)
 * 
 * @returns Custom Navbar
 */
const Navbar = ({ style,titleStyle,back, title = "UNSET",backStyle={} }) => {
    const route = useHistory()
    return (
        <nav
            className="nav-bar"
            style={style}>
            {back && <i style={backStyle} onClick={()=>route.replace(back)} className="fas fa-chevron-left"></i>}
            <h3 style={titleStyle}>
                {title}
            </h3>
        </nav>
    );
}

export default Navbar;