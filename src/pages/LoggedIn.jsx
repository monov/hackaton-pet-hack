import React, { useEffect, useState } from "react";
import "./LoggedIn.css";
import { useNavigate } from "react-router-dom";
import PopUp from "../components/PopUp";

const LoggedIn = () => {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);

  const handleEx = () => {
    setPopup((e) => !e);
  };

  let token = localStorage.getItem("authToken");
  let username = localStorage.getItem("userName");
  console.log(token, username);
  useEffect(() => {
    if (!username || !token) {
      navigate('/')
    }
  }, [token,username]);

  return (
    <>
      <PopUp popup={popup} setPopup={setPopup} />
      <div className="loggedin-body">
        <h1>С возвращением,&nbsp;{localStorage.getItem("userName")}!</h1>
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
