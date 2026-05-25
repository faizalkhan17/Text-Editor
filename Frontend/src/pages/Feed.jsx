import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Feed.css";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/posts?status=published"
        );

        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="feed-container">
      <div className="feed-box">
        {/* <h2 className="feed-title">Feed</h2> */}

        {posts.length === 0 ? (
          <p className="no-posts">No posts found</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="post-card">
              <div
                className="post-content"
                dangerouslySetInnerHTML={{
                  __html: post.content
                }}
              ></div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Feed;