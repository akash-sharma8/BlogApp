import { useState, useEffect, useContext } from "react";
import { getBlogs, deleteBlog, likeBlog } from "../utils/blogApi";
import BlogCard from "../components/Blog/BlogCard";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await getBlogs();
        setBlogs(res.data.blogs);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };
    fetchBlogs();
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
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">All Blogs</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            blog={blog}
            user={user}
            onDelete={handleDelete}
            onLike={handleLike}

          />

        ))}
      </div>
    </div>
  );
}
