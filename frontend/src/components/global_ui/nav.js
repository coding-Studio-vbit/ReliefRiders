import React from "react";
import { useHistory } from "react-router-dom";
import "./nav.css";
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
 * onBackClick : function : Custom function which executes when back is clicked
 * @returns Custom Navbar
 */
const Navbar = ({
  style,
  titleStyle,
  back,
  title = "UNSET",
  //backStyle = {},
  onBackClick = null,
}) => {
  const route = useHistory();
  return (
    <nav className="nav-bar" style={style}>
      {back && (
        <i
          style={{cursor:"pointer"}}
          onClick={() => {
            if (onBackClick !== null) {
              onBackClick();
            } else route.replace(back);
          }}
          className="fas fa-chevron-left"
        ></i>
      )}
      <h3 style={titleStyle}>{title}</h3>
    </nav>
  );
};

export default Navbar;
