"use client";  
import Image from "next/image";
import { useState } from "react";
import Postlist from "./Postlist";
import CreatePost from "./CreatePost";

export default function Home() {
  const [newPost, setNewPost] = useState(null);
  const [updatedPosts, setUpdatedPosts] = useState({});
  const [deletedPosts, setDeletedPosts] = useState(new Set());

  const handleUpdatePost = (id, newTitle) => {
    setUpdatedPosts((prev) => ({ ...prev, [id]: newTitle }));
  };

  const handleDeletePost = (id) => {
    setDeletedPosts((prev) => new Set(prev).add(id));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <Image src="/next.svg" alt="Next.js logo" width={180} height={38} priority />

      <h1 className="text-4xl font-bold text-blue-600 mt-4 text-center">
        🎉 Welcome to Next.js with Tailwind!
      </h1>

      <p className="text-lg text-gray-700 mt-2 text-center">
        Edit <code className="bg-gray-200 px-2 py-1 rounded">app/page.js</code> to get started.
      </p>

      {/* Buttons Section */}
      <div className="mt-6 flex gap-4">
        <a
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition shadow-md"
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          📖 Read Next.js Docs
        </a>
        <a
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition shadow-md"
          href="https://vercel.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          🏆 Deploy with Vercel
        </a>
      </div>

      {/* Create Post Section */}
      <div className="mt-10 p-6 bg-white shadow-lg rounded-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">📝 Create a New Post</h2>
        <CreatePost onNewPost={setNewPost} />
      </div>

      {/* Posts Section */}
      <div className="mt-10 p-6 bg-white shadow-lg rounded-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">📜 Latest Posts</h2>
        <Postlist
          newPost={newPost}
          updatedPosts={updatedPosts}
          deletedPosts={deletedPosts}
          onUpdatePost={handleUpdatePost}
          onDeletePost={handleDeletePost}
        />
      </div>
    </div>
  );
}

