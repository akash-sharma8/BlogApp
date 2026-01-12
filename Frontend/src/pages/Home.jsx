import { useState, useEffect, useContext } from "react";
import { getBlogs, deleteBlog, likeBlog } from "../utils/blogApi";
import BlogCard from "../components/Blog/BlogCard";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await getBlogs();

        // ✅ Backend returns { success, count, blogs }
        if (res.data?.success && Array.isArray(res.data.blogs)) {
          setBlogs(res.data.blogs);
        } else {
          setBlogs([]);
        }
      } catch (err) {
        console.error(err.response?.data || err.message);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteBlog(id);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleLike = async (id) => {
    try {
      const { data: updatedBlog } = await likeBlog(id);
      setBlogs((prev) =>
        prev.map((blog) =>
          blog._id === updatedBlog._id ? updatedBlog : blog
        )
      );
    } catch (error) {
      console.error("Like failed", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 animate-fadeIn">
      
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Explore Blogs
        </h1>
        <p className="text-gray-600">
          Read ideas, stories and experiences from creators
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-64 bg-gray-200 rounded-xl animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && blogs.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">
            No blogs yet
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Be the first one to write a blog
          </p>
        </div>
      )}

      {/* Blog Grid */}
      {!loading && blogs.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="animate-slideUp">
              <BlogCard
                blog={blog}
                user={user}
                onDelete={handleDelete}
                onLike={handleLike}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
