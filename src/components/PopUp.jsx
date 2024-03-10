import React, { useState } from "react";
import "./PopUp.css";
import { useNavigate } from "react-router-dom";

const PopUp = ({ popup, setPopup }) => {
  const navigate = useNavigate();
  const handleEx = () => {
    setPopup((e) => !e);
  };
  const api = import.meta.env.VITE_API_BASE_URL;
  const logOut = async () => {
    const response = await fetch(`${api}api/logout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("authToken")}`,
      },
    });

    if (response.status == 200) {
      navigate(`/`);
    }
  };
  return (
    <div
      className="app-popup-body"
      style={{
        display: popup ? "flex" : "none",
      }}
    >
      <div className="app-popup-stuff">
        <h3>Точно выйти?</h3>
        <button className="out ye" onClick={logOut}>
          Да, точно
        </button>
        <button className="out nah" onClick={handleEx}>
          Нет, остаться
        </button>
      </div>
    </div>
  );
};

export default PopUp;
