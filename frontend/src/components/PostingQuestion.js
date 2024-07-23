import { useState } from "react";
import "../styling/PostingQuestion.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const PostingQuestion = () => {
    const [content, setContent] = useState("");
    const token = localStorage.getItem("userInfo");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post("http://localhost:5000/api/ques/post", {ques : content},{
            headers:{
                authorization: `Bearer ${token}`,
            }
        })
        console.log(response);
        if(response.data.message === "Please write a ques") {
            return toast.warn("Write your question");
        }
        navigate("/dashboard")
    };
    return (
        <div className="PostingQuestion">
            <div className="Posting-Form">
                    <h3>Ask a Question</h3>
                    <form onSubmit={handleSubmit}>
                        <textarea 
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder='Type your question here...'
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <ToastContainer />
        </div>
    )
}

export default PostingQuestion;