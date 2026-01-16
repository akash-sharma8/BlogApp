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
    // 'selection:bg-indigo-500/30' is great for desktop, 'overflow-x-hidden' is vital for mobile
    <div className="min-h-screen bg-[#0f172a] text-slate-200 overflow-x-hidden pb-12">
      
      {/* 1. Mobile-Optimized Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[5%] -left-[10%] w-[70%] h-[30%] rounded-full bg-indigo-600/20 blur-[80px] md:blur-[120px]" />
        <div className="absolute bottom-[10%] -right-[10%] w-[60%] h-[30%] rounded-full bg-purple-600/15 blur-[80px] md:blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16">
        
        {/* 2. Header: Smaller font sizes for mobile to prevent weird wrapping */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-16 text-center"
        >
          <h1 className="text-3xl md:text-6xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 leading-tight">
            Explore Blogs
          </h1>
          <p className="text-slate-400 text-sm md:text-lg max-w-2xl mx-auto px-4">
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
        </motion.div>

        {/* 3. Loading State: Skeleton height adjusted for small screens */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-64 md:h-80 rounded-2xl bg-slate-800/40 border border-slate-700/30 animate-pulse p-5 space-y-4"
              />
            ))}
          </div>
        )}

        {/* 4. Blog Grid: grid-cols-1 for mobile is essential */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {blogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.03, // Faster delay for mobile snappiness
                  ease: "easeOut"
                }}
                // 'active:scale-95' provides haptic-like visual feedback on touch
                className="group relative active:scale-[0.98] transition-transform duration-200"
              >
                {/* Subtle outer glow for mobile */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-600/20 rounded-2xl blur-sm md:opacity-0 md:group-hover:opacity-100 transition duration-500" />
                
                <div className="relative h-full">
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

      {/* 5. Mobile Floating Action Button (Optional) */}
      {/* If you have a 'Create Post' route, a FAB is standard for mobile UI */}
    </div>
  );
}