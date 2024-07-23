import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styling/PostId.css";

const PostId = () => {
  const { id } = useParams();
  const location = useLocation();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("userInfo");
        const [postResponse, likesResponse, commentsResponse] =
          await Promise.all([
            axios.get(`http://localhost:5000/api/post/get/${id}`, {
              headers: { authorization: `Bearer ${token}` },
            }),
            axios.get(`http://localhost:5000/api/postLikes/get/${id}`, {
              headers: { authorization: `Bearer ${token}` },
            }),
            axios.get(`http://localhost:5000/api/comment/get/${id}`, {
              headers: { authorization: `Bearer ${token}` },
            }),
          ]);

        setPost(postResponse.data.data[0]);
        setLikes(likesResponse.data.data[0].likes);
        if (commentsResponse.data.message !== "NO comments posted till now") {
          setComments(commentsResponse.data.data);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, location.pathname]);

  const handleLike = async () => {
    setLikeLoading(true);
    try {
      const token = localStorage.getItem("userInfo");
      await axios.post(
        `http://localhost:5000/api/postLikes/post/${id}`,
        { postId: id },
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
        `http://localhost:5000/api/comment/post/${id}`,
        { comment: newComment, postId: id },
        { headers: { authorization: `Bearer ${token}` } }
      );
      setComments((prevComments) => [
        { name: details.name, comment: response.data.data },
        ...prevComments,
      ]);
      setNewComment("");
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
          <h3 onClick={() => userPage(post.userId)}>{post.name}</h3>
        </div>
        <p className="post-text">{post.post}</p>
        <div className="post-actions">
          <button onClick={handleLike} disabled={likeLoading}>
            {likeLoading ? "Liking..." : `Like (${likes})`}
          </button>
        </div>
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
          />
          <button type="submit" disabled={commentLoading}>
            {commentLoading ? "Posting..." : "Post Comment"}
          </button>
        </form>
      </div>
      <div className="comments-section">
        <h4>Comments</h4>
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            <strong>{comment.name}: </strong>
            <p>{comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostId;
