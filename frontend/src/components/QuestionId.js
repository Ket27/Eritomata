import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styling/PostId.css";

const QuestionId = () => {
    const {id} = useParams();
    const [ques, setQues] = useState(null);
    const [answers, setAnswers] = useState([]);
  const [newAnswers, setNewAnswer] = useState("");
  const [likes, setLikes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const navigate = useNavigate();

    useEffect(() => {
        const fetchQues = async () => {
          setLoading(true);
          try {
            const token = localStorage.getItem("userInfo");
            const [quesResponse, likesResponse, answersResponse] =
              await Promise.all([
                axios.get(`http://localhost:5000/api/ques/get/${id}`, {
                  headers: { authorization: `Bearer ${token}` },
                }),
                axios.get(`http://localhost:5000/api/quesLikes/get/${id}`, {
                  headers: { authorization: `Bearer ${token}` },
                }),
                axios.get(`http://localhost:5000/api/answer/get/${id}`, {
                  headers: { authorization: `Bearer ${token}` },
                }),
              ]);
            // console.log(quesResponse);
            // console.log(likesResponse);
            // console.log(answersResponse);
            setQues(quesResponse.data.data[0]);
            setLikes(likesResponse.data.data[0].likes);
            if (answersResponse.data.message !== "NO answers posted till now") {
              setAnswers(answersResponse.data.data);
            }
          } catch (error) {
            console.error("Error fetching post:", error);
          } finally {
            setLoading(false);
          }
        };
        fetchQues();
    }, [id]);

    const handleLike = async () => {
        setLikeLoading(true);
        try {
          const token = localStorage.getItem("userInfo");
          await axios.post(
            `http://localhost:5000/api/quesLikes/post/${id}`,
            { quesId: id },
            { headers: { authorization: `Bearer ${token}` } }
          );
          setLikes((prevLikes) => prevLikes + 1);
        } catch (error) {
          console.error("Error liking post:", error);
        } finally {
          setLikeLoading(false);
        }
      };

      const userPage = (id) => {
        navigate(`/user/profile/${id}`);
      }
    
      const handleCommentSubmit = async (e) => {
        e.preventDefault();
        setCommentLoading(true);
        try {
          const token = localStorage.getItem("userInfo");
          const details = JSON.parse(localStorage.getItem("userDetails"));
          const response = await axios.post(
            `http://localhost:5000/api/answer/post/${id}`,
            { answer: newAnswers, quesId: id },
            { headers: { authorization: `Bearer ${token}` } }
          );
          setAnswers((prevAnswers) => [
            { name: details.name, answer: response.data.data },
            ...prevAnswers,
          ]);
          setNewAnswer("");
        } catch (error) {
          console.error("Error posting comment:", error);
        } finally {
          setCommentLoading(false);
        }
      };
    

      if (loading) return <div>Loading...</div>;

      return (
        <div className="postId-container">
          <div className="post-content">
            <div className="user-info">
              <h3 onClick={() => userPage(ques.userId)}>{ques.name}</h3>
            </div>
            <p className="post-text">{ques.question}</p>
            <div className="post-actions">
              <button onClick={handleLike} disabled={likeLoading}>
                {likeLoading ? "Liking..." : `Like (${likes})`}
              </button>
            </div>
            <form onSubmit={handleCommentSubmit} className="comment-form">
              <textarea
                value={newAnswers}
                onChange={(e) => setNewAnswer(e.target.value)}
                placeholder="Write your answer..."
              />
              <button type="submit" disabled={commentLoading}>
                {commentLoading ? "Posting..." : "Post Answer"}
              </button>
            </form>
          </div>
          <div className="comments-section">
            <h4>Comments</h4>
            {answers.map((answer, index) => (
              <div key={index} className="comment">
                <strong>{answer.name}: </strong>
                <p>{answer.answer}</p>
              </div>
            ))}
          </div>
        </div>
      );

}

export default QuestionId;