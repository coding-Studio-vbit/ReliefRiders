import React from "react";
import Style from "./checklist.module.css";
function CheckList({ requester }) {
  return (
    <ol>
      {requester.map((req) => {
        return (
          <li className={Style.checklist_container} key={req.itemName}>
            <span>
              {req.itemName} - {req.quantity}
            </span>
            <div className={Style.checklist_checkbox}>
              <input type="checkbox" className={Style.checklist1} />
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default CheckList;
