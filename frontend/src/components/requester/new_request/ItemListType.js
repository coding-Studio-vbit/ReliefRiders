import React from 'react';
import { useHistory } from "react-router-dom";
import ItemListTypeCSS from './ItemListType.module.css'
import Navbar from '../../global_ui/nav';


function ListType() {

    const history = useHistory();

    const routehandler = (route) => {
        history.push(route);
    };

    return(
        <div>
            <div className={'row'}>
			    <Navbar back='/new_request' backStyle={{ color: "white" }} title="New Request" titleStyle={{ color: "white" }} style={{ backgroundColor: "#79CBC5", marginBottom: "10px" }}/>
 		    </div>
            <div className={ItemListTypeCSS.container}>
                <span className={ItemListTypeCSS.headText}>
                    Please choose the items you want to request
                </span>
                <button onClick={() => routehandler("add_image")} style={{alignSelf:'center'}} className={ItemListTypeCSS.btnUpload1}>
                    <span className={ItemListTypeCSS.btnUploadText}>
                        Upload Image
                    </span>
                </button>
                <span className={ItemListTypeCSS.choice}>
                    or
                </span>
                <button onClick={() => routehandler("enter_items")} style={{alignSelf:'center'}}className={ItemListTypeCSS.btnUpload2}>
                    <span className={ItemListTypeCSS.btnUploadText}>
                        Enter Items
                    </span>
                </button>
            </div>
        </div>
    )
    
}
export default ListType;