"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import AddPost from "./AddPost";

function Posts() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch(`http://localhost:3000/api/posts`);
    const postsData = await response.json();
    setPosts(postsData.reverse());
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostAdded = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-20">
      <AddPost onPostAdded={handlePostAdded} />
      <div className="flex flex-wrap gap-20 justify-center">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            className="block max-w-sm p-6 bg-white border border-red-500  shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {post.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {post.body}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Posts;
