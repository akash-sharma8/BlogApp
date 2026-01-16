import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleBlog, deleteBlog, likeBlog, commentBlog } from "../utils/blogApi";
import { AuthContext } from "../context/AuthContext";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [blog, setBlog] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);

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
      <div className="max-w-3xl mx-auto p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-8" />
        <div className="h-40 bg-gray-200 rounded" />
      </div>
    );
  }

  const isOwner = user?._id === blog.author?._id;

  const handleDelete = async () => {
    if (!window.confirm("Are you sure?")) return;
    await deleteBlog(blog._id);
    navigate("/");
  };

  const handleLike = async () => {
    const res = await likeBlog(blog._id);
    setBlog((prev) => ({ ...prev, likes: res.data.likes }));
  };

const handleComment = async () => {
  if (!commentText.trim()) return;
  try {
    const res = await commentBlog(blog._id, commentText); // pass string, not object
    setBlog(res.data); // backend returns full blog with comments
    setCommentText("");
  } catch (err) {
    console.error("Failed to post comment:", err);
  }
};


  return (
    <div className="max-w-3xl mx-auto px-6 py-10 animate-fadeIn">
      
      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-3">
        {blog.title}
      </h1>

      {/* Author */}
      <p className="text-gray-500 mb-8">
        By <span className="font-medium">{blog.author?.username}</span>
      </p>

      {/* Content */}
      <article className="prose max-w-none text-gray-800 leading-relaxed whitespace-pre-line">
        {blog.content}
      </article>

      {/* Actions */}
      <div className="flex items-center gap-6 mt-10">
        <button
          onClick={handleLike}
          className="flex items-center gap-2 text-pink-500 
                     hover:scale-110 transition-transform"
        >
          ❤️ <span>{blog.likes?.length || 0}</span>
        </button>

        {isOwner && (
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 transition"
          >
            Delete
          </button>
        )}
      </div>

      {/* Comments Section */}
      <div className="mt-12">
        
        {/* Toggle */}
        <button
          onClick={() => setShowCommentBox(!showCommentBox)}
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600
                     transition"
        >
          💬 <span>{blog.comments?.length || 0} Comments</span>
        </button>

        {/* Comment List */}
        <div className="mt-6 space-y-4">
          {blog.comments?.map((c, i) => (
  <div key={i} className="bg-gray-50 border rounded-lg p-3 animate-slideUp">
    <p className="text-sm font-medium text-gray-800">
      {c.author?.username || "Unknown"} {/* safe fallback */}
    </p>
    <p className="text-gray-700 text-sm mt-1">{c.content}</p>
  </div>
))}

        </div>

        {/* Comment Input */}
        {user && showCommentBox && (
          <div className="mt-6 flex gap-3 animate-slideUp">
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 border px-4 py-2 rounded-lg outline-none
                         focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleComment}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg
                         hover:bg-blue-700 active:scale-95 transition"
            >
              Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
