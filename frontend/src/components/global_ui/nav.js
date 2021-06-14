import React from 'react';
const Navbar = ({title}) => {
    return ( 
        <nav 
        
        style={{
            width:'100%',
            height:'60px',
            textAlign:'center',
            letterSpacing:2+'px',
            fontSize:1.3+'em',
            color:'white',
            alignContent: 'center',
            display: 'grid',
            backgroundColor: '#79cbc5'
        }}>
            <h3>
                  {title}
            </h3>
        </nav>
     );
}
 
export default Navbar;