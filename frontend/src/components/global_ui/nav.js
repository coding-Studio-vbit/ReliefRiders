import React from 'react';
const Navbar = ({title}) => {
    return ( 
        <nav 
        className="nav-bar"
        style={{
            width:'100%',
            padding: 0.7+'em',
            height:'fit-content',
            textAlign:'center',
            letterSpacing:2+'px',
            fontSize:1.1+'em',
            color:'black'
        }}>
            <h3>
                  {title}
            </h3>
        </nav>
     );
}
 
export default Navbar;