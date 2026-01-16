import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart, FaComment, FaEdit, FaTrashAlt } from "react-icons/fa";

export default function BlogCard({ blog, user, onDelete, onLike }) {
  // Corrected ID check for MongoDB consistency
  const isOwner = user?._id === blog.author?._id;
  const isLiked = blog.likes?.includes(user?._id);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative flex flex-col h-full bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 shadow-xl transition-all duration-300"
    >
      {/* Decorative Gradient Glow (Top Right) */}
      <div className="absolute top-0 right-0 -mt-2 -mr-2 w-20 h-20 bg-indigo-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Header: Title & Author */}
      <div className="mb-4">
        <Link to={`/blog/${blog._id}`}>
          <h2 className="text-2xl font-bold text-white leading-tight group-hover:text-indigo-400 transition-colors duration-300 line-clamp-2">
            {blog.title}
          </h2>
        </Link>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-[10px] text-indigo-300 font-bold border border-indigo-500/30">
            {blog.author?.username?.charAt(0).toUpperCase() || "?"}
          </div>
          <p className="text-xs text-slate-400">
            by <span className="text-slate-200 font-medium">{blog.author?.username || "Unknown"}</span>
          </p>
        </div>
      </div>

      {/* Content Preview */}
      <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
        {blog.content}
      </p>

      {/* Read More Link */}
      <div className="mt-auto">
        <Link
          to={`/blog/${blog._id}`}
          className="inline-flex items-center gap-2 text-indigo-400 font-semibold text-sm group/link"
        >
          Read full story
          <span className="transform group-hover/link:translate-x-1 transition-transform">→</span>
        </Link>
      </div>

      {/* Divider */}
      <div className="my-5 h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

      {/* Actions Footer */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          {/* Like Button */}
          <button
            onClick={() => onLike(blog._id)}
            className={`flex items-center gap-1.5 transition-all duration-300 ${
              isLiked ? "text-pink-500 scale-110" : "text-slate-500 hover:text-pink-400"
            }`}
          >
            {isLiked ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
            <span className="text-xs font-bold">{blog.likes?.length || 0}</span>
          </button>

          {/* Comment Count */}
          <Link
            to={`/blog/${blog._id}`}
            className="flex items-center gap-1.5 text-slate-500 hover:text-indigo-400 transition-colors"
          >
            <FaComment size={17} />
            <span className="text-xs font-bold">{blog.comments?.length || 0}</span>
          </Link>
        </div>

        {/* Owner Controls: Visible on Card Hover */}
        {isOwner && (
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link
              to={`/edit-blog/${blog._id}`}
              className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-all"
              title="Edit Post"
            >
              <FaEdit size={16} />
            </Link>
            <button
              onClick={() => onDelete(blog._id)}
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
              title="Delete Post"
            >
              <FaTrashAlt size={16} />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}