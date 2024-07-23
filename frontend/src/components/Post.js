import { useNavigate } from "react-router-dom";
import "../styling/Post.css";

const Post = ({ posts }) => {
  const navigate = useNavigate();
  const changePage = (id) => {
    navigate(`/content/post/${id}`);
  }

  const userPage = (id) => {
    navigate(`/user/profile/${id}`);
  }

  return (
    <div className="content-wrapper">
      <div className="post-container">
        {posts.map((post) => (
          <div key={post.id} className="post" onClick={() => changePage(post.id)}>
            <div className="post-meta">
              <p className="post-author" onClick={() => userPage(post.userId)}>By {post.name}</p>
              <p className="post-date">
                Posted on: {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
            <p className="post-content">{post.post}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
