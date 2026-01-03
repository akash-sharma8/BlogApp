import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import BlogCard from "../components/Blog/BlogCard";
import { getBlogs, deleteBlog, likeBlog } from "../utils/blogApi";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      const res = await getBlogs(); // get all blogs and filter by owner
      setBlogs(res.data.blogs.filter((b) => b.author._id === user._id));
    };
    fetchMyBlogs();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await deleteBlog(id);
    setBlogs((prev) => prev.filter((b) => b._id !== id));
  };

  const handleLike = async (id) => {
    const res = await likeBlog(id);
    setBlogs((prev) =>
      prev.map((b) => (b._id === id ? { ...b, likes: res.data.likes } : b))
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{user.username}'s Blogs</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} user={user} onDelete={handleDelete} onLike={handleLike} />
        ))}
      </div>
    </div>
  );
}
