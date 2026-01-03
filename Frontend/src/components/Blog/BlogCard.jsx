import { Link } from "react-router-dom";

export default function BlogCard({ blog, user, onDelete, onLike }) {
  const isOwner = user?.id === blog.author?._id;

  return (
    <div className="border p-4 rounded shadow flex flex-col gap-3">
      <div>
        <h2 className="text-xl font-bold">{blog.title}</h2>
        <p className="text-sm text-gray-600">
          By {blog.author?.username || "Unknown"}
        </p>

        {/* Limited Content */}
        <p className="mt-2 text-gray-700">
          {blog.content.slice(0, 120)}...
        </p>

        {/* Read More */}
        <Link
          to={`/blog/${blog._id}`}
          className="text-blue-600 text-sm font-medium"
        >
          Read more →
        </Link>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        {/* Like */}
        <button
          onClick={() => onLike(blog._id)}
          className="text-pink-500"
        >
          ❤️ {blog.likes?.length || 0}
        </button>

        {/* Comment Icon */}
        <Link to={`/blog/${blog._id}`} className="text-gray-600">
          💬 {blog.comments?.length || 0}
        </Link>
      </div>

      {/* Owner Controls */}
      {isOwner && (
        <div className="flex gap-3 text-sm">
          <Link to={`/edit-blog/${blog._id}`} className="text-green-600">
            Edit
          </Link>
          <button
            onClick={() => onDelete(blog._id)}
            className="text-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
