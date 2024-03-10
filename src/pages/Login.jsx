import React, { useState } from "react";
import "./Login.css";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate(); 
  const [isEye, setEye] = useState(false);
  const [pass, setPass] = useState(true);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const eyeClickHandle = () => {
    setEye((e) => !e);
  };
  const handleChangeU = (value) => {
    setUser(value);
  };
  const handleChangeP = (value) => {
    setPassword(value);
  };
  const api = import.meta.env.VITE_API_BASE_URL;
  async function login() {
    const loginUsername = user;
    const loginPassword = password;

    const loginData = {
      username: loginUsername,
      password: loginPassword,
    };

    try {
      const response = await fetch(`${api}api/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.status === 200) {
        console.log("vse chetka");
        let data = await response.json();
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userName", data.username);
        navigate(`/cabinet/${localStorage.getItem('userName')}`);
      } else if (response.status === 401) {
        setPass((e) => !e);
      } else {
        console.error("Login error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  const reg = () => {
    navigate("/signup")
  }

  return (
    <div className="app-login-body">
      <div
        className="error-cant-login"
        style={{
          opacity: pass ? "0" : "1",
        }}
      >
        Неверный логин или пароль
      </div>
      <div className="app-login-pic-wrapper">
        <div className="app-login-pic"></div>
        <div className="app-login-pic-txt">
          <h3>Lorby</h3>
          <p>Твой личный репетитор</p>
        </div>
      </div>
      <div className="other-shit">
        <div className="other-shit-form">
          <h1>Вэлком бэк!</h1>
          <input
            className="app-login input uname"
            value={user}
            onChange={(e) => handleChangeU(e.target.value)}
            type="text"
            name=""
            placeholder="Введи логин"
          />
          <div className="pass-input-warpper">
            <input
              className="app-login input pass"
              value={password}
              onChange={(e) => handleChangeP(e.target.value)}
              type={isEye ? "text" : "password"}
              name=""
              placeholder="Введи пароль"
            />
            {isEye ? (
              <IoEyeOffOutline onClick={eyeClickHandle} />
            ) : (
              <IoEyeOutline onClick={eyeClickHandle} />
            )}
          </div>
          <button className="button" onClick={login}>
            Войти
          </button>
          <button className="ya-loh" onClick={reg}>У меня еще нет аккаунта</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
