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
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await getSingleBlog(id);
        
        const blogData = res.data.blog;
        
        // 🔍 DEBUG: Let's see ALL properties of the user object
        console.log("Full User Object:", user);
        console.log("User keys:", Object.keys(user || {}));
        
        // Try different possible property names
        const currentUserId = user?.userId || user?.id || user?._id;
        
        console.log("Blog Author ID:", blogData.author?._id);
        console.log("Detected Current User ID:", currentUserId);
        console.log("User ID match:", blogData.author?._id === currentUserId);
        
        // Authorization check with flexible ID detection
        if (blogData.author?._id !== currentUserId) {
          console.log("Authorization failed - redirecting to home");
          navigate("/");
          return;
        }
        
        console.log("Authorization passed - setting blog data");
        
        // Set the values
        setTitle(blogData.title || "");
        setContent(blogData.content || "");
        
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id && user) {
      fetchBlog();
    }
  }, [id, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBlog(id, { title, content });
      navigate(`/`);
    } catch (err) {
      console.error("Error updating blog:", err);
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-gray-300 text-xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-red-400 text-xl">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-2xl space-y-6 relative z-10 border border-gray-700"
      >
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8">
          ✏️ Edit Blog
        </h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title"
          required
          className="w-full border border-gray-600 bg-gray-800 text-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out shadow-sm hover:shadow-md placeholder-gray-500"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your content here..."
          required
          className="w-full border border-gray-600 bg-gray-800 text-gray-200 p-3 rounded-xl h-48 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300 ease-in-out shadow-sm hover:shadow-md placeholder-gray-500"
        />

        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold w-full hover:from-blue-500 hover:to-purple-500 hover:scale-105 transition-transform duration-300 ease-in-out shadow-md hover:shadow-lg"
        >
          Update
        </button>
      </form>
    </div>
  );
}