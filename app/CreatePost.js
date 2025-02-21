"use client";
import { useState } from "react";

export default function CreatePost({ onNewPost }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ title: "", body: "" });

  const validateForm = () => {
    let valid = true;
    let newErrors = { title: "", body: "" };

    if (title.trim().length < 5) {
      newErrors.title = "Title must be at least 5 characters long.";
      valid = false;
    }

    if (body.trim().length < 10) {
      newErrors.body = "Post content must be at least 10 characters long.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    const newPost = {
      title,
      body,
      userId: 1,
      id: Math.floor(Math.random() * 1000) + 101, // Fake ID
    };

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      if (res.ok) {
        onNewPost(newPost);
        alert("Post created successfully!");
        setTitle("");
        setBody("");
        setErrors({ title: "", body: "" }); 
      } else {
        alert("Error creating post!");
      }
    } catch (error) {
      alert("Network error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 text-center"></h2>

      {/* Title Input */}
      <div>
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full p-3 border rounded-lg focus:ring focus:ring-blue-200 outline-none ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
          required
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      {/* Content Input */}
      <div>
        <textarea
          placeholder="Post Content"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className={`w-full p-3 border rounded-lg focus:ring focus:ring-blue-200 outline-none ${
            errors.body ? "border-red-500" : "border-gray-300"
          }`}
          required
          rows="4"
        />
        {errors.body && <p className="text-red-500 text-sm mt-1">{errors.body}</p>}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition duration-300 shadow-md disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Posting..." : "Create Post"}
        </button>
      </div>
    </form>
  );
}
