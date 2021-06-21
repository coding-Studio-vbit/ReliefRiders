import React from 'react';
import ItemListTypeCSS from './ItemListType.module.css'


function ListType() {
    return(
        <div>
            <nav className={ItemListTypeCSS.navbar}>
                <div className={ItemListTypeCSS.backDiv}>
                    <button className={ItemListTypeCSS.btnBack}>
                        <i className='fas fa-chevron-left'></i>
                    </button>
                </div>
                <span className={ItemListTypeCSS.navHead}>
                    New Request
                </span>
            </nav>
            <div className={ItemListTypeCSS.container}>
                <span className={ItemListTypeCSS.headText}>
                    Please choose the items you want to request
                </span>
                <button className={ItemListTypeCSS.btnUpload1}>
                    <span className={ItemListTypeCSS.btnUploadText}>
                        Upload Image
                    </span>
                </button>
                <span className={ItemListTypeCSS.choice}>
                    or
                </span>
                <button style={{alignSelf:'center'}}className={ItemListTypeCSS.btnUpload2}>
                    <span className={ItemListTypeCSS.btnUploadText}>
                        Enter Items
                    </span>
                </button>
            </div>
        </div>
    )
    
}
export default ListType;