import "../styling/Post.css";
import { useNavigate } from "react-router-dom";

const Question = ({ questions }) => {
  const navigate = useNavigate();
  const changePage = (id) => {
    navigate(`/content/question/${id}`);
  }

  return (
    <div className="content-wrapper">
      <div className="post-container">
        {questions.map((question) => (
          <div key={question.id} className="post" onClick={() => changePage(question.id)}>
            <div className="post-meta">
              <p className="post-author">By {question.name}</p>
              <p className="post-date">
                Posted on: {new Date(question.createdAt).toLocaleDateString()}
              </p>
            </div>
            <p className="post-content">{question.question}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
