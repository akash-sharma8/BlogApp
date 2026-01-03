import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleBlog, deleteBlog, likeBlog, commentBlog } from "../utils/blogApi";
import { AuthContext } from "../context/AuthContext";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [showCommentBox, setShowCommentBox] = useState(false);

  const [blog, setBlog] = useState(null);
  const [commentText, setCommentText] = useState("");

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

  if (!blog) return <p className="p-4">Loading...</p>;

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
    const res = await commentBlog(blog._id, { comment: commentText });
    setBlog((prev) => ({ ...prev, comments: res.data.comments }));
    setCommentText("");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <p className="text-gray-600 mt-2">By {blog.author?.username}</p>
      <p className="mt-6 whitespace-pre-line">{blog.content}</p>

      <div className="flex gap-4 mt-6">
        <button onClick={handleLike} className="text-pink-500">
          Like ({blog.likes?.length || 0})
        </button>

        {isOwner && (
          <button onClick={handleDelete} className="text-red-500">
            Delete
          </button>
        )}
      </div>

      {/* Comments */}
      {/* Comments */}
      <div className="mt-6">
        <div
          className="flex items-center gap-2 cursor-pointer text-gray-700"
          onClick={() => setShowCommentBox(!showCommentBox)}
        >
          💬 <span>{blog.comments?.length || 0} Comments</span>
        </div>

        {/* Comment List */}
        {blog.comments?.map((c, i) => (
          <p key={i} className="border-b py-1 mt-2">
            <strong>{c.user.username}</strong>: {c.comment}
          </p>
        ))}

        {/* Comment Input (toggle) */}
        {user && showCommentBox && (
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="border p-2 flex-1 rounded"
            />
            <button
              onClick={handleComment}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Post
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
