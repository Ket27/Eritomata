import "../styling/Login.css";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions } from "../store/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setState }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async () => {
    if (!email || !password) {
      return toast.warn("Fill All Details");
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // console.log(response);
      dispatch(userActions.setUserDetails(response.data));
      localStorage.setItem("userInfo", response.data.token);
      navigate("/dashboard");
      toast.success("Login successful");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error(error.response.data.message || "Invalid credentials");
        } else if (error.response.status === 404) {
          toast.error("User not found");
        } else {
          toast.error("An error occurred. Please try again.");
        }
      } else if (error.request) {
        toast.error("No response from server. Please try again.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
      console.error("Error:", error);
    }
    finally {
      setLoading(false); 
    }
  };

  const stateChange = () => {
    setState("SignUp");
  };

  return (
    <div className="Login-container">
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="login-button">
        <p>
          New User? <span onClick={stateChange}>Register</span>
        </p>
        <button type="submit" onClick={submitHandler}>
        {loading ? 'Logging in...' : 'Login'}
        </button>
        {/* {loading && <span>Please wait...</span>} */}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
