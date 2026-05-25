import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/posts/user/me");
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching user posts:", err);
        setMessage("Could not load your posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, []);

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/posts/${postId}`);
      setPosts(posts.filter((post) => post._id !== postId));
      setMessage("Post deleted successfully.");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error deleting post:", err);
      setMessage("Failed to delete the post.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>My Dashboard</h1>
        <p className="posts-count">
          Total Articles Published: <strong>{posts.length}</strong>
        </p>
      </div>

      {message && <div className="dashboard-message">{message}</div>}

      {loading ? (
        <div className="loading">Loading posts...</div>
      ) : posts.length === 0 ? (
        <div className="no-posts">
          <p>You haven't created any posts yet.</p>
          <Link to="/create" className="create-link-btn">Create Your First Post</Link>
        </div>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <div key={post._id} className="post-card">
              <div className="post-card-content">
                <h3>{post.caption || "Untitled Post"}</h3>
                <p className="post-status">Status: {post.status}</p>
                <p className="post-date">
                  Created: {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="post-card-actions">
                <Link to={`/richeditor/${post._id}`} className="edit-btn">
                  Edit Content
                </Link>
                <button onClick={() => handleDelete(post._id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
