import "../styling/WebAuth.css";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase/firebase.js";
import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions } from "../store/userSlice.js";

export const auth = getAuth(app);

const WebAuth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();

      const response = await axios.post(
        "http://localhost:5000/api/auth/google",
        { idToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Authentication successful", response.data);
      dispatch(userActions.setUserDetails(response.data));
      localStorage.setItem("userInfo", response.data.token);
      console.log(response.data);
      navigate("/dashboard");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error signing in with Google (Axios error):",
          error.response?.data || error.message
        );
      } else {
        console.error("Error signing in with Google:", error);
      }
      throw error;
    }
  };

  return (
    <>
      <button className="google-button" onClick={signInWithGoogle}>
        SignUp with Google
      </button>
    </>
  );
};

export default WebAuth;
