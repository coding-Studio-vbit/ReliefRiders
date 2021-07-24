/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./checklist.module.css";
function CheckList({ items ,category,dispatch}) {

  const _check = (e,item,index)=>{
    if(e.target.checked){
      dispatch({type:'SETITEMS',payload:item})
    }else{

      dispatch({type:'REMOVEITEMS',payload:index})

    }
  }

  return (
    <>
    <span style={{paddingTop:'0.5em'}} >Items requested</span>
    <div className={styles.category}>
          {category.map((cat) => (
            <span
              className={cat[1] === "E" ? styles.catGreen : styles.catGray}
              key={cat}
            >
              {cat}
            </span>
          ))}
        </div>
    <span style={{textAlign:'center'}} >Please tick the items you purchased</span>
    <ol  className={styles.checklist_container} >

      {items.map((req,index) => {
        return (
          <li className={styles.checkbox} key={req.itemName}>
            <span>
              {req.itemName} - {req.quantity}
            </span>
            <div className={styles.checklist_checkbox}>
              <input onChange={(e)=>_check(e,req,index)} type="checkbox" className={styles.checklist1} />
            </div>
          </li>
        );
      })}
    </ol>
    </>
  );
}

export default CheckList;
