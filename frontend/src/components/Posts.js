import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import "../styling/Posts.css"

const Posts = () => {
    const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("userInfo");
      const response = await axios.get("http://localhost:5000/api/post/get/", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      setPosts(response.data.data);
    };
    fetchPosts();
  }, []);

  return <div className="Posts-Container">
        <Post posts = {posts}/>
  </div>;
};

export default Posts;
