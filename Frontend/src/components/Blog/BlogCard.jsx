import { Link } from "react-router-dom";

export default function BlogCard({ blog, user, onDelete, onLike }) {
  const isOwner = user?.id === blog.author?._id;

  return (
    <div className="group bg-white border border-gray-200 rounded-xl p-5 shadow-sm 
                    hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      
      {/* Title & Author */}
      <div className="mb-3">
        <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition">
          {blog.title}
        </h2>
        <p className="text-sm text-gray-500">
          By <span className="font-medium">{blog.author?.username || "Unknown"}</span>
        </p>
      </div>

      {/* Content Preview */}
      <p className="text-gray-700 leading-relaxed mb-4">
        {blog.content.slice(0, 120)}...
      </p>

      {/* Read More */}
      <Link
        to={`/blog/${blog._id}`}
        className="inline-block text-blue-600 font-medium text-sm 
                   relative after:absolute after:left-0 after:-bottom-1 
                   after:h-[2px] after:w-0 after:bg-blue-600 
                   after:transition-all after:duration-300 
                   hover:after:w-full"
      >
        Read more →
      </Link>

      {/* Divider */}
      <div className="my-4 h-px bg-gray-200" />

      {/* Actions */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          {/* Like Button */}
          <button
            onClick={() => onLike(blog._id)}
            className="flex items-center gap-1 text-pink-500 
                       hover:scale-110 transition-transform duration-200"
          >
            ❤️ <span className="text-sm">{blog.likes?.length || 0}</span>
          </button>

          {/* Comment Icon */}
          <Link
            to={`/blog/${blog._id}`}
            className="flex items-center gap-1 text-gray-600 
                       hover:text-blue-600 transition"
          >
            💬 <span className="text-sm">{blog.comments?.length || 0}</span>
          </Link>
        </div>

        {/* Owner Controls */}
        {isOwner && (
          <div className="flex gap-3 text-sm opacity-0 group-hover:opacity-100 transition">
            <Link
              to={`/edit-blog/${blog._id}`}
              className="text-green-600 hover:underline"
            >
              Edit
            </Link>
            <button
              onClick={() => onDelete(blog._id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
