import { useState } from "react";
import "../styling/PostingPost.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const PostingPost = () => {
    const [content, setContent] = useState("");
    const token = localStorage.getItem("userInfo");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post("http://localhost:5000/api/post/post", {post : content},{
            headers:{
                authorization: `Bearer ${token}`,
            }
        })
        // console.log(response);
        if(response.data.message === "Please write a post") {
            return toast.warn("Write your content");
        }
        navigate("/dashboard")
    };
    return (
        <div className="PostingPost">
            <div className="Posting-Form">
                    <h3>Create a Post</h3>
                    <form onSubmit={handleSubmit}>
                        <textarea 
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder='Type your Post here...'
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <ToastContainer />
        </div>
    )
}

export default PostingPost;