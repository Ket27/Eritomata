import Login from "../components/Login";
import SignUp from "../components/SignUp";
import WebAuth from "../components/WebAuth";
import React, { useState } from "react";
import "../styling/Auth.css";

const Auth = () => {
  const [state, setState] = useState("Login");

  return (
    <div className="Auth-container">
      <div className="Logo">Hello!<br/>
        code with ketan
      </div>
      <div className="Authenticate">
        <div className="google-auth">
            <WebAuth />
        </div>
        <div className="email-auth">
            Authenticate
            {state === "Login" && <Login setState = {setState}/>}
            {state === "SignUp" && <SignUp setState = {setState}/>}
        </div>
      </div>
    </div>
  );
};

export default Auth;
