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
  const [loading, setLoading] = useState(true); // optional loading state

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getSingleBlog(id);

        // Make sure API response matches your data structure
        const blog = res.data.blog || res.data; // sometimes API returns { blog: {...} }
        
        // Check ownership
        if (blog.author?._id !== user?._id && blog.author?._id !== user?.userId) {
          navigate("/"); // redirect if not owner
          return;
        }

        // Set state so textarea/input shows content
        setTitle(blog.title);
        setContent(blog.content);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
        navigate("/"); // redirect on error
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
      navigate(`/blog/${id}`); // redirect to blog detail page
    } catch (err) {
      console.error("Failed to update blog:", err);
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
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl rounded-2xl mt-10 transition-all duration-500 ease-in-out hover:scale-[1.01] border border-gray-700 relative text-gray-100">
      {/* Subtle Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 opacity-0 hover:opacity-30 transition-opacity duration-500 rounded-2xl"></div>

      <h1 className="text-3xl font-extrabold mb-6 text-center animate-fadeIn bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        ✏️ Edit Blog
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 relative">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title"
          className="w-full border border-gray-600 bg-gray-800 text-gray-200 p-3 rounded-xl 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                     transition duration-300 ease-in-out shadow-sm hover:shadow-md placeholder-gray-500"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your content here..."
          className="w-full border border-gray-600 bg-gray-800 text-gray-200 p-3 rounded-xl h-64 resize-none 
                     focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent 
                     transition duration-300 ease-in-out shadow-sm hover:shadow-md placeholder-gray-500 break-words"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold w-full 
                     hover:from-blue-500 hover:to-purple-500 hover:scale-105 transition-transform duration-300 ease-in-out 
                     shadow-md hover:shadow-lg"
        >
          Update
        </button>
      </form>
    </div>
  );
}
