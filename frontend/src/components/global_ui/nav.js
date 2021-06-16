import React from 'react';
const Navbar = ({title}) => {
    return ( 
        <nav 
        
        style={{
            width:'100%',
            height:'fit-content',
            textAlign:'center',
            letterSpacing:2+'px',
            fontSize:1.3+'em',
            color:'black'
        }}>
            <h3>
                  {title}
            </h3>
        </nav>
     );
}
 
export default Navbar;