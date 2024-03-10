import React, { useState, useRef } from "react";
import {
  IoEyeOffOutline,
  IoEyeOutline,
  IoChevronBackOutline,
} from "react-icons/io5";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const api = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [isEye, setEye] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [reppassword, setReppassword] = useState("");
  const [email, setEmail] = useState("");
  const [passmatch, setPassmatch] = useState(false);
  const [passwordLengthValid, setPasswordLengthValid] = useState(false);
  const [passwordLowerUpperValid, setPasswordLowerUpperValid] = useState(false);
  const [passwordDigitValid, setPasswordDigitValid] = useState(false);
  const [passwordSpecialCharValid, setPasswordSpecialCharValid] =
    useState(false);
  const [isFormValid, setFormVal] = useState(false);
  const [verify, setVerify] = useState(false);
  const eyeClickHandle = () => {
    setEye((e) => !e);
  };
  const handleChangeU = (value) => {
    setUser(value);
    setFormVal(passmatch);
  };
  const handleChangeP = (value) => {
    setPassword(value);
    setPasswordLengthValid(value.length >= 8 && value.length <= 15);
    setPasswordLowerUpperValid(/(?=.*[a-z])(?=.*[A-Z])/.test(value));
    setPasswordDigitValid(/\d/.test(value));
    setPasswordSpecialCharValid(/[!@#$%^&*()_+]/.test(value));
    setPassmatch(value === reppassword);
    setFormVal(value === reppassword);
  };
  const handleChangeRP = (value) => {
    setReppassword(value);
    if (password == value) {
      setPassmatch(true);
    } else {
      setPassmatch(false);
    }
    setFormVal(password == value);
  };
  const handleChangeE = (value) => {
    setEmail(value);
  };

  const nextHandle = () => {
    setVerify(true);
    signup();
  };

  const backHandle = () => {
    navigate("/");
  };
  function signup() {
    const signupEmail = email;
    const signupUsername = user;
    const signupPassword = password;

    const signupData = {
      username: signupUsername,
      email: signupEmail,
      password: signupPassword,
    };

    fetch(`${api}api/signup/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    })
      .then((response) => {
        if (response.status == 201) {
          console.log("Signup successful");
        } else {
          alert("Signup failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      {verify ? (
        <Verify verify={verify} setVerify={setVerify} email={email} />
      ) : (
        <div className="app-signup-body">
          <div className="app-login-pic-wrapper">
            <div className="app-login-pic"></div>
            <div className="app-login-pic-txt">
              <h3>Lorby</h3>
              <p>Твой личный репетитор</p>
            </div>
          </div>

          <div className="other-shit">
            <div className="app-back" onClick={backHandle}>
              <IoChevronBackOutline className="app-back-icon" />
              <p>Назад</p>
            </div>
            <div className="other-shit-form">
              <h1>Создать аккаунт Lorby</h1>
              <input
                className="app-login input uname"
                value={email}
                onChange={(e) => handleChangeE(e.target.value)}
                type="text"
                name=""
                placeholder="Введи адрес почты"
              />
              <input
                className="app-login input uname"
                value={user}
                onChange={(e) => handleChangeU(e.target.value)}
                type="text"
                name=""
                placeholder="Придумай логин"
              />
              <div className="pass-input-warpper">
                <input
                  className="app-login input pass"
                  value={password}
                  onChange={(e) => handleChangeP(e.target.value)}
                  type={isEye ? "text" : "password"}
                  placeholder="Создай пароль"
                />
                {isEye ? (
                  <IoEyeOffOutline onClick={eyeClickHandle} />
                ) : (
                  <IoEyeOutline onClick={eyeClickHandle} />
                )}
              </div>
              <ul className="pass-list">
                <li style={{ color: passwordLengthValid ? "green" : "red" }}>
                  От 8 до 15 символов
                </li>
                <li
                  style={{ color: passwordLowerUpperValid ? "green" : "red" }}
                >
                  Строчные и прописные буквы
                </li>
                <li style={{ color: passwordDigitValid ? "green" : "red" }}>
                  Минимум 1 цифра
                </li>
                <li
                  style={{ color: passwordSpecialCharValid ? "green" : "red" }}
                >
                  Минимум 1 спецсимвол (!, ", #, $...)
                </li>
              </ul>
              <div className="pass-input-warpper rep">
                <input
                  className="app-login input pass rep"
                  value={reppassword}
                  onChange={(e) => handleChangeRP(e.target.value)}
                  type={isEye ? "text" : "password"}
                  style={{
                    color: passmatch ? "green" : "red",
                  }}
                  placeholder="Повтори пароль"
                />
                {isEye ? (
                  <IoEyeOffOutline onClick={eyeClickHandle} />
                ) : (
                  <IoEyeOutline onClick={eyeClickHandle} />
                )}
              </div>
              <button
                className="button signup"
                disabled={!isFormValid}
                style={{
                  background: isFormValid ? "var(--main-color)" : "gray",
                  color: isFormValid ? "#fff" : "#000",
                  cursor: isFormValid ? "pointer" : "not-allowed",
                }}
                onClick={nextHandle}
              >
                Далее
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;

const Verify = ({ verify, setVerify, email }) => {
  const navigate = useNavigate()
  const api = import.meta.env.VITE_API_BASE_URL;
  const [inputValues, setInputValues] = useState(["", "", "", ""]);
  const backHandle = () => {
    setVerify(false);
  };
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleInputChange = (index, event) => {
    const { value } = event.target;
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);

    if (value) {
      if (index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus();
      }
    } else {
      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
    }
  };
  const assembleInputs = async () => {
    const assembledValue = inputValues.join("");
    console.log("Assembled Value:", assembledValue);
    const data = {
      email: email,
      code: assembledValue,
    };

    const response = await fetch(`${api}api/verify-email/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      console.log("vse chetka");
      let data = await response.json();
      console.log(data)
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userName", data.username);
      navigate(`/cabinet`);
    }
  };
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div className="app-signup-body">
        <div className="app-back" onClick={backHandle}>
          <IoChevronBackOutline className="app-back-icon" />
          <p>Назад</p>
        </div>
        <div className="app-login-pic-wrapper">
          <div className="app-login-pic"></div>
          <div className="app-login-pic-txt">
            <h3>Lorby</h3>
            <p>Твой личный репетитор</p>
          </div>
        </div>
        <div className="verify-stuff">
          <p>
            Введи 4-значный код,
            <br /> высланный на <br />
            {email}
          </p>

          <div className="inputs">
            <input
              maxLength={1}
              className="sinput"
              type="text"
              ref={inputRefs[0]}
              onChange={(e) => handleInputChange(0, e)}
            />
            <input
              maxLength={1}
              className="sinput"
              type="text"
              ref={inputRefs[1]}
              onChange={(e) => handleInputChange(1, e)}
            />
            <input
              maxLength={1}
              className="sinput"
              type="text"
              ref={inputRefs[2]}
              onChange={(e) => handleInputChange(2, e)}
            />
            <input
              maxLength={1}
              className="sinput"
              type="text"
              ref={inputRefs[3]}
              onChange={(e) => handleInputChange(3, e)}
            />
          </div>
          <button className="button rein" onClick={assembleInputs}>
            Подтвердить
          </button>
          <p className="p">Выслать код повторно</p>
        </div>
      </div>
    </div>
  );
};
