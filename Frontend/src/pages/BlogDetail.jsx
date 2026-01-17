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
      <div className="max-w-4xl mx-auto p-8 animate-pulse">
        <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4 mb-6" />
        <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/4 mb-10" />
        <div className="space-y-4">
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full" />
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-5/6" />
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-4/5" />
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4" />
        </div>
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
    <div className="max-w-4xl mx-auto px-8 py-12 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      
      {/* Blog Container */}
      <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100 hover:shadow-2xl transition-shadow duration-500">
        
        {/* Title */}
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {blog.title}
        </h1>

        {/* Author & Date */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {blog.author?.username?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <p className="text-gray-700 font-semibold">
              By {blog.author?.username || "Unknown"}
            </p>
            {blog.createdAt && (
              <p className="text-sm text-gray-500">
                {new Date(blog.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            )}
          </div>
        </div>

        {/* Content */}
        <article className="prose prose-lg max-w-none text-gray-800 leading-relaxed whitespace-pre-line mb-12">
          {blog.content}
        </article>

        {/* Actions */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-8">
          <div className="flex items-center gap-6">
            <button
              onClick={handleLike}
              className="flex items-center gap-3 text-red-500 hover:text-red-600 
                         hover:scale-110 transition-all duration-200 group"
            >
              <svg className="w-6 h-6 fill-current group-hover:animate-pulse" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span className="font-medium">{blog.likes?.length || 0} Likes</span>
            </button>
          </div>

          {isOwner && (
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 text-red-500 hover:text-red-700 font-medium transition-colors duration-200 group"
            >
              <svg className="w-5 h-5 fill-current group-hover:animate-bounce" viewBox="0 0 24 24">
                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete Blog
            </button>
          )}
        </div>

        {/* Comments Section */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          
          {/* Toggle */}
          <button
            onClick={() => setShowCommentBox(!showCommentBox)}
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-200 group"
          >
            <svg className="w-6 h-6 fill-current group-hover:animate-pulse" viewBox="0 0 24 24">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
            <span>{blog.comments?.length || 0} Comments</span>
            <svg className={`w-4 h-4 transition-transform duration-200 ${showCommentBox ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Comment List */}
          <div className="mt-8 space-y-6">
            {blog.comments?.map((c, i) => (
              <div key={i} className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 animate-fadeIn">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {c.author?.username?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <p className="text-sm font-semibold text-gray-800">
                    {c.author?.username || "Unknown"}
                  </p>
                </div>
                <p className="text-gray-700 leading-relaxed">{c.content}</p>
              </div>
            ))}
          </div>

          {/* Comment Input */}
          {user && showCommentBox && (
            <div className="mt-8 flex gap-4 animate-slideUp">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Share your thoughts..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full border-2 border-gray-200 px-5 py-3 rounded-2xl outline-none
                             focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200"
                />
              </div>
              <button
                onClick={handleComment}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl
                           hover:from-blue-700 hover:to-purple-700 active:scale-95 transition-all duration-200 font-medium shadow-lg"
              >
                Post Comment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}