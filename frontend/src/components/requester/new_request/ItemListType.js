import React from 'react';
import './ItemList.css'


function ListType() {
    return(
        <div>
            <nav className='navbar'>
                <div className='back_div'>
                    <button className='btn_back'>
                        <i className='fas fa-chevron-left'></i>
                    </button>
                </div>
                <span className='nav_head'>
                    New Request
                </span>
            </nav>
            <div className='container'>
                <span className='head_text'>
                    Please choose the items you want to request
                </span>
                <button className='upload1'>
                    <span className='upload_text'>
                        Upload Image
                    </span>
                </button>
                <span className='choice'>
                    or
                </span>
                <button style={{alignSelf:'center'}}className='upload2'>
                    <span className='upload_text'>
                        Enter Items
                    </span>
                </button>
            </div>

        </div>
    )
    
}
export default ListType;