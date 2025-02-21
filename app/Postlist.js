"use client";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

const fetchPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return res.json();
};

export default function Postlist({ newPost, onUpdatePost, onDeletePost }) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const [posts, setPosts] = useState([]);

  // Load posts when data is fetched
  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data]);

  // Add new post to the list
  useEffect(() => {
    if (newPost) {
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    }
  }, [newPost]);

  // Update a post
  const handleUpdate = (id) => {
    const updatedTitle = prompt("✏️ Enter new title:");
    if (!updatedTitle) return;

    const updatedPost = posts.map((post) =>
      post.id === id ? { ...post, title: updatedTitle } : post
    );

    setPosts(updatedPost);
    onUpdatePost(id, updatedTitle);
  };

  // Delete a post
  const handleDelete = (id) => {
    if (!confirm("🗑️ Are you sure you want to delete this post?")) return;
    setPosts(posts.filter((post) => post.id !== id));
    onDeletePost(id);
  };

  if (isLoading) return <p className="text-center text-gray-600">⏳ Loading posts...</p>;
  if (error) return <p className="text-center text-red-600">❌ Error loading posts.</p>;

  return (
    <div className="grid gap-6">
      {posts.map((post) => (
        <div key={post.id} className="p-5 border rounded-lg shadow-lg bg-white hover:shadow-2xl transition-all">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">📌 {post.title}</h2>
          <p className="text-gray-600">{post.body}</p>
          <div className="mt-3 flex gap-3">
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition shadow-md"
              onClick={() => handleUpdate(post.id)}
            >
              ✏️ Update
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition shadow-md"
              onClick={() => handleDelete(post.id)}
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
