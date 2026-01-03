import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleBlog, updateBlog } from "../utils/blogApi";
import { AuthContext } from "../context/AuthContext";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await getSingleBlog(id);
      if (res.data.author._id !== user.userId) {
        navigate("/");
      }
      setTitle(res.data.title);
      setContent(res.data.content);
    };
    fetchBlog();
  }, [id, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateBlog(id, { title, content });
    navigate(`/blog/${id}`);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 rounded h-40"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
}
