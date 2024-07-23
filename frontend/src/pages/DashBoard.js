import React from "react";
import "../styling/DashBoard.css";
import Posts from "../components/Posts";
import NavBar from "../components/NavBar";
import TopPosts from "../components/TopPosts";
import Posting from "../components/Posting";
import Questions from "../components/Questions";

const DashBoard = ({state, setState}) => {
  return (
    <div className="dashboard-page">
      <NavBar setState = {setState} />
      <div className="Posts">
        <div className="Posting">
          <Posting />
          <TopPosts /> 
        </div>
        {state === "AllPosts" && <Posts />}
        {state === "AllQuestions" && <Questions/>}
      </div>
    </div>
  );
};

export default DashBoard;
