import React, { useState } from "react";
import "./LoggedIn.css";
import { useNavigate } from "react-router-dom";
import PopUp from "../components/PopUp";

const LoggedIn = () => {
  const [popup, setPopup] = useState(false);
  

  const handleEx = () => {
    setPopup((e) => !e);
  };
  return (
    <>
      <PopUp popup={popup} setPopup={setPopup} />
      <div className="loggedin-body">
        <h1>С возвращением!</h1>
        <p>Lorby - твой личный репетитор</p>
        <div className="loggedin-pic"></div>
        <p className="p" onClick={handleEx}>
          Выйти
        </p>
      </div>
    </>
  );
};

export default LoggedIn;
