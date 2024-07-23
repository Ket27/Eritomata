import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styling/UserDetails.css";

const UserDetails = () => {
  const [following, setFollowing] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [desc, setDesc] = useState("");
  const { id } = useParams();
  const [alreadyFollowing , setAlreadyFollowing] = useState(false)
  const[currentUser, setCurrentUser] = useState(true);

  useEffect (() => {
    const token = localStorage.getItem("userInfo");
    if (!token) {
      console.error("No token found");
      return;
    }

    setCurrentUser(id == JSON.parse(localStorage.getItem("userDetails")).id);
    const fetchData = async () => {
      try {
        const [userResponse, followingResponse, followersResponse, followingOrNotResponse] = await Promise.all([
          axios.get(`http://localhost:5000/api/auth/getUser/${id}`,
            {headers: {authorization: `Bearer ${token}`,},}
          ),
          axios.get(
            `http://localhost:5000/api/follow/getFollowing/${id}`,
            {headers: {authorization: `Bearer ${token}`,},}
          ),
          axios.get(
            `http://localhost:5000/api/follow/getFollowers/${id}`,
            {headers: {authorization: `Bearer ${token}`,},}
          ),
          axios.get(
            `http://localhost:5000/api/follow//followingOrNot/${id}`, 
            {headers: {authorization: `Bearer ${token}`,},}
          )
        ])
        
        setName(userResponse.data.data[0].name);
        setEmail(userResponse.data.data[0].email);
        setDesc(userResponse.data.data[0].desc);
        setFollowing(followingResponse.data.data[0].Following);
        setFollowers(followersResponse.data.data[0].Followers);

        if(followingOrNotResponse.data.message === "Already following"){
          setAlreadyFollowing(true);
        }
      } catch (err) {
        if (err.response) {
          if (err.response.status === 404) {
            console.error("Error fetching following:", err.response.data);
          } else {
            console.error("Error fetching following:", err.response.data);
          }
        } else if (err.request) {
          console.error("No response received:", err.request);
        } else {
          console.error("Error setting up request:", err.message);
        }
      }
    };
    fetchData();
  }, [id, setAlreadyFollowing])

  const followIncrease = async () => {
    const token = localStorage.getItem("userInfo");
    if (!token) {
      console.error("No token found");
      return;
    }

    await axios.post(`http://localhost:5000/api/follow/post/${id}`,{},{headers: {authorization: `Bearer ${token}`,},});
    setFollowers((follow) => follow+1);
  }

  return (
    <div className="UserDetails-Container">
      <div className="Already-Following">
        <h2>{name} {!currentUser && !alreadyFollowing && <button className="follow-btn" onClick={followIncrease}>Follow</button>}</h2>
        <p>{!currentUser && alreadyFollowing && "Following"}</p>
      </div>
      <p>Email: {email}</p>
      Following: {following} Followers: {followers}
      <p className="user-desc">Description: {desc}</p>
    </div>
  );
};

export default UserDetails;
