"use client";
import React, { useState } from "react";

function AddPost({ onPostAdded }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    });

    if (response.ok) {
      const newPost = await response.json();
      onPostAdded(newPost.post);
      setTitle("");
      setBody("");
    } else {
      console.error("Failed to add post");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="mb-8 w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <span className=" w-full flex gap-5">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post Title"
              className="p-2 border border-red-300 rounded"
            />
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Enter your post"
              className="p-2 border border-red-300 rounded "
            />
          </span>
          <button
            type="submit"
            className="p-2 bg-red-600 text-white rounded hover:bg-red-800"
          >
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPost;
