import { useState, useContext } from "react";
import { createBlog } from "../utils/blogApi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Write() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Title and content are required!");
      return;
    }

    try {
      const blogData = { title, content, category, author: user._id };
      const res = await createBlog(blogData);
      navigate(`/blog/${res.data.blog._id}`);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to create blog. Try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10 transition-all duration-500 ease-in-out hover:scale-[1.01]">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-800 text-center animate-fadeIn">
        Write a New Blog
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm hover:shadow-md transition duration-300 ease-in-out"
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl h-48 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm hover:shadow-md transition duration-300 ease-in-out"
        />

        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm hover:shadow-md transition duration-300 ease-in-out"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold w-full hover:bg-green-700 hover:scale-105 transition-transform duration-300 ease-in-out shadow-md hover:shadow-lg"
        >
          Publish
        </button>
      </form>
    </div>
  );
}
