import "../styling/SignUp.css";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userActions } from "../store/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = ({setState}) => {
  const [name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async () => {
    if (!name || !email || !password) {
      return toast.warn("Fill All Details");
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // console.log(response);
      if(response.data.message === "User already exists") return toast.warn("User Already Exists");
      dispatch(userActions.setUserDetails(response.data.data));
      navigate("/dashboard");
      toast.success("Register successful");
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
        setState("Login");
    }

  return (
    <div className="Login-container">
        <input type="text" placeholder="Name" onChange={(e) => {setName(e.target.value)}}/>
      <input type="email" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}}/>
      <input type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
      <div className="login-button">
        <p>
          Already a User? <span onClick = {stateChange}>Login</span>
        </p>
        <button type="submit" onClick={submitHandler}>{loading ? 'Signing Up...' : 'Sign Up'}</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
