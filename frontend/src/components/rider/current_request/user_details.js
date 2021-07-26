import React from "react";
import styles from './user_details.module.css'
const UserDetails = ({ covid, name, phone }) => {
  const btnStyle = {
    background: "var(--secondary)",
    fontWeight: "bold",
    padding: "0.2em 0.90em",
    textDecoration: "none",
    cursor: "pointer",
    color: "hsl(0 0% 90%)",
    borderRadius: "16px",
    boxShadow: "0 0 5px var(--almost-transparent)",
    fontSize: "0.87rem",
  };
  return (
    <div
      style={{
        position: "relative",
        boxShadow: "0 0 10px var(--almost-transparent)",
        padding: "12px",
        borderRadius: "8px",
        width: "min(90%,400px)",
      }}
    >
      {covid && (
        <div
        className={styles.covidDot}
          style={{
            position: "absolute",
            right: "16px",
            height: "11px",
            padding:'0',
            width: "11px",
            top: "16px",
            background: "red",
            borderRadius: "50%",
          }}
        />
      )}
      <p
        style={{
          textAlign: "center",
          marginBottom: "0.5rem",
          textDecoration: "underline",
        }}
      >
        Requester Details
      </p>
      {covid && (
        <span
          style={{
            color: "red",
            marginTop: "0.6em",
            fontWeight: "bold",
          }}
        >
          Requester is covid positive
        </span>
      )}
      <p>Name : {name}</p>
      <span>
        {" "}
        Phone : <i className="fas fa-phone-alt"></i> {phone}
      </span>
      <div
        style={{
          display: "flex",
          marginTop: "8px",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "8px",
        }}
      >
        <a href={"tel:+91" + phone} style={btnStyle}>
          Call
        </a>
        <a
          href={"https://api.whatsapp.com/send?phone=+91" + phone}
          style={{ ...btnStyle, background: "green" }}
        >
          <i className="fab fa-whatsapp"></i> Whatsapp
        </a>
      </div>
    </div>
  );
};

export default UserDetails;
