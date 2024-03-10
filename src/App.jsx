import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import LoggedIn from "./pages/LoggedIn";
import Signup from "./pages/Signup";

function App() {
  const username = localStorage.getItem('userName'); 
  return (
    <div className="app-body">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route
          path={`/cabinet/${username}`}
          element={
           <LoggedIn />
          }
        ></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </div>
  );
}

export default App;
