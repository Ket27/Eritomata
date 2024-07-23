import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaRegClock } from "react-icons/fa6";
import "../styling/QuestionContent.css"; 


const PostContent = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("userInfo");

    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/post/getUserPost/${id}`,
          { headers: { authorization: `Bearer ${token}` } }
        );
        setQuestions(response.data.data);
      } catch (err) {
        setError("Failed to fetch questions. Please try again later.");
        console.error("Error fetching questions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [id]);

  return (
    <div className="content-area">
      {loading && <div className="loading">Loading posts...</div>}
      {error && <div className="error-message">{error}</div>}
      {!loading && !error && (
        <div className="question-grid">
            {!questions && "No Posts"}
          {questions && questions.map((question) => (
            <div key={question.id} className="question-card">
              <p className="question-content">{question.post}</p>
              <div className="question-meta">
                <span>
                  <FaRegClock /> {new Date(question.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostContent;
