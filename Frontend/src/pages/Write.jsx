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
      // Include author info
      const blogData = {
        title,
        content,
        category,
        author: user._id, // Backend should accept this
      };

      const res = await createBlog(blogData);

      // Navigate to the newly created blog detail page
      navigate(`/blog/${res.data.blog._id}`);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to create blog. Try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Write Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 rounded h-40"
        />

        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Publish
        </button>
      </form>
    </div>
  );
}
