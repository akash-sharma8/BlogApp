import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaRegHeart, FaComment, FaTrashAlt, FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import { getSingleBlog, deleteBlog, likeBlog, commentBlog } from "../utils/blogApi";
import { AuthContext } from "../context/AuthContext";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [blog, setBlog] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getSingleBlog(id);
        setBlog(res.data.blog);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto p-10 space-y-8">
        <div className="h-12 bg-slate-800/50 rounded-xl animate-pulse w-3/4" />
        <div className="h-6 bg-slate-800/50 rounded-xl animate-pulse w-1/4" />
        <div className="h-96 bg-slate-800/50 rounded-3xl animate-pulse" />
      </div>
    );
  }

  const isOwner = user?._id === blog.author?._id;
  const isLiked = blog.likes?.includes(user?._id);

  const handleDelete = async () => {
    if (!window.confirm("Permanent delete? This cannot be undone.")) return;
    await deleteBlog(blog._id);
    navigate("/");
  };

  const handleLike = async () => {
    setIsLiking(true);
    const res = await likeBlog(blog._id);
    setBlog((prev) => ({ ...prev, likes: res.data.likes }));
    setTimeout(() => setIsLiking(false), 400);
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;
    try {
      const res = await commentBlog(blog._id, commentText);
      setBlog(res.data);
      setCommentText("");
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 pb-20">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 pt-10">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Feed</span>
        </button>

        {/* Header Section */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            {blog.title}
          </h1>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
              {blog.author?.username?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-slate-200 font-medium">{blog.author?.username}</p>
              <p className="text-slate-500 text-sm">Published on {new Date(blog.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <motion.article 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert prose-slate max-w-none text-slate-300 leading-relaxed text-lg whitespace-pre-line bg-slate-800/20 backdrop-blur-sm border border-slate-800/50 p-8 md:p-12 rounded-3xl shadow-2xl"
        >
          {blog.content}
        </motion.article>

        {/* Interaction Bar */}
        <div className="flex items-center justify-between mt-12 py-6 border-y border-slate-800/50">
          <div className="flex items-center gap-8">
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={handleLike}
              className={`flex items-center gap-2 text-lg transition-colors ${
                isLiked ? "text-pink-500" : "text-slate-400 hover:text-pink-400"
              }`}
            >
              <span className={isLiking ? "animate-ping" : ""}>
                {isLiked ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
              </span>
              <span className="font-semibold">{blog.likes?.length || 0}</span>
            </motion.button>

            <button
              onClick={() => setShowCommentBox(!showCommentBox)}
              className="flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors text-lg"
            >
              <FaComment size={22} />
              <span className="font-semibold">{blog.comments?.length || 0}</span>
            </button>
          </div>

          {isOwner && (
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
            >
              <FaTrashAlt />
              <span className="font-medium">Delete Post</span>
            </button>
          )}
        </div>

        {/* Comments Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-8">Discussions</h2>

          {/* Comment Input */}
          <AnimatePresence>
            {user && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10 relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-500" />
                <div className="relative flex gap-3 bg-slate-900 border border-slate-700 p-2 rounded-2xl focus-within:border-indigo-500 transition-all">
                  <input
                    type="text"
                    placeholder="Add a thoughtful comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-slate-200 placeholder:text-slate-500"
                  />
                  <button
                    onClick={handleComment}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-xl flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-indigo-600/20"
                  >
                    <FaPaperPlane size={14} />
                    <span className="hidden sm:inline">Post</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Comment List */}
          <div className="space-y-6">
            <AnimatePresence>
              {blog.comments?.map((c, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-800/30 border border-slate-800/50 p-5 rounded-2xl backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-indigo-400 uppercase">
                      {c.author?.username?.charAt(0)}
                    </div>
                    <span className="text-sm font-semibold text-slate-200">
                      {c.author?.username || "Writer"}
                    </span>
                  </div>
                  <p className="text-slate-400 text-md pl-11 leading-relaxed">
                    {c.content}
                  </p>
                </motion.div>
              )).reverse()}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </div>
  );
}