import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import BlogCard from "../components/Blog/BlogCard";
import { getBlogs, deleteBlog, likeBlog } from "../utils/blogApi";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      const res = await getBlogs(); 
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
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800 text-center animate-fadeIn">
        {user.username}'s Blogs
      </h1>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500 mt-10 animate-fadeIn">
          You haven’t written any blogs yet.
        </p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="transition-transform duration-300 hover:scale-105 hover:shadow-xl rounded-xl"
            >
              <BlogCard
                blog={blog}
                user={user}
                onDelete={handleDelete}
                onLike={handleLike}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
