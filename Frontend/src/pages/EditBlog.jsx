import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleBlog, updateBlog } from "../utils/blogApi";
import { AuthContext } from "../context/AuthContext";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getSingleBlog(id);
        const blog = res.data.blog || res.data;

        // Ownership check
        if (blog.author?._id !== user?._id && blog.author?._id !== user?.userId) {
          alert("You are not authorized to edit this blog!");
          navigate("/");
          return;
        }

        setTitle(blog.title);
        setContent(blog.content);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchBlog();
  }, [id, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBlog(id, { title, content });
      alert("Blog updated successfully!");
      navigate(`/blog/${id}`);
    } catch (err) {
      console.error("Failed to update blog:", err);
      alert("Failed to update blog. Check console for details.");
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-8 text-gray-300 animate-pulse">
        <div className="h-6 bg-gray-700 rounded mb-4 w-3/4"></div>
        <div className="h-32 bg-gray-700 rounded mb-4 w-full"></div>
        <div className="h-10 bg-gray-700 rounded w-1/3"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl rounded-2xl mt-10 text-gray-100 relative">
      <h1 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        ✏️ Edit Blog
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title"
          className="w-full border border-gray-600 bg-gray-800 text-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 placeholder-gray-500"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your content here..."
          className="w-full border border-gray-600 bg-gray-800 text-gray-200 p-3 rounded-xl h-64 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 placeholder-gray-500 break-words"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold w-full hover:from-blue-500 hover:to-purple-500 hover:scale-105 transition-transform duration-300"
        >
          Update
        </button>
      </form>
    </div>
  );
}
