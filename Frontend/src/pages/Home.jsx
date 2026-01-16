import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
        prev.map((blog) => (blog._id === updatedBlog._id ? updatedBlog : blog))
      );
    } catch (error) {
      console.error("Like failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 selection:bg-indigo-500/30">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-purple-600/10 blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Explore Blogs
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-80 rounded-2xl bg-slate-800/50 border border-slate-700/50 animate-pulse flex flex-col p-6 space-y-4"
              >
                <div className="w-full h-40 bg-slate-700/50 rounded-xl" />
                <div className="w-3/4 h-6 bg-slate-700/50 rounded-md" />
                <div className="w-1/2 h-4 bg-slate-700/50 rounded-md" />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && blogs.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 backdrop-blur-md bg-slate-800/20 rounded-3xl border border-slate-800"
          >
            <p className="text-slate-300 text-2xl font-medium">No blogs found</p>
            <p className="text-slate-500 mt-2">Be the first to share your story with the world.</p>
          </motion.div>
        )}

        {/* Blog Grid */}
        <motion.div 
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {blogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.05,
                  ease: [0.23, 1, 0.32, 1] 
                }}
                className="group relative"
              >
                {/* Glow Effect on Hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500" />
                
                <div className="relative h-full transition-transform duration-300 group-hover:-translate-y-2">
                  <BlogCard
                    blog={blog}
                    user={user}
                    onDelete={handleDelete}
                    onLike={handleLike}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}