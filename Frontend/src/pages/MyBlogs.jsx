import { useEffect, useState, useContext } from "react";
import { getMyBlog, deleteBlog, likeBlog } from "../utils/blogApi";
import BlogCard from "../components/Blog/BlogCard";
import { AuthContext } from "../context/AuthContext";

export default function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const res = await getMyBlog();
        setBlogs(res.data.blogs);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };
    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await deleteBlog(id);
    setBlogs((prev) => prev.filter((b) => b._id !== id));
  };

  const handleLike = async (id) => {
    try {
      const { data: updatedBlog } = await likeBlog(id);
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === updatedBlog._id ? updatedBlog : blog
        )
      );
    } catch (error) {
      console.error("Like failed", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800 text-center animate-fadeIn">
        My Blogs
      </h1>
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
      {blogs.length === 0 && (
        <p className="text-center text-gray-500 mt-10 animate-fadeIn">
          You haven’t written any blogs yet.
        </p>
      )}
    </div>
  );
}
