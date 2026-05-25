import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Createpost.css";

const Createpost = () => {
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("caption", caption);

      const res = await axios.post(
        "http://localhost:3000/posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          status: "draft",
        }
      );

      const id = res.data._id;

      navigate(`/richeditor/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="createpost-container">
      <div className="createpost-box">
        <h2>Create New Post</h2>

        <div className="input-group">
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <input
            type="text"
            placeholder="Enter the caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>

        <button className="submit-btn" onClick={handleClick}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Createpost;