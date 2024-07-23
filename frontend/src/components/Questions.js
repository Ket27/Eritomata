import axios from "axios";
import React, { useEffect, useState } from "react";
import Question from "./Question";
import "../styling/Posts.css"

const Questions = () => {
    const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const fetchQuestions = async () => {
      const token = localStorage.getItem("userInfo");
      const response = await axios.get("http://localhost:5000/api/ques/get", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      // console.log(response);
      setQuestions(response.data.data);
    };
    fetchQuestions();
  }, []);

  return <div className="Posts-Container">
        <Question questions = {questions}/>
  </div>;
};

export default Questions;
