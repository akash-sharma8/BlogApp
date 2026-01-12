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
    navigate(`/`);
  };

  return (
    <div className="max-w-3xl text-black mx-auto p-6 bg-white shadow-lg rounded-xl mt-10 transition-all duration-500 ease-in-out transform hover:scale-105">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800 text-center animate-fadeIn">
        Edit Blog
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title"
          className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out shadow-sm hover:shadow-md"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your content here..."
          className="w-full border border-gray-300 p-3 rounded-xl h-48 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out shadow-sm hover:shadow-md"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold w-full hover:bg-blue-700 hover:scale-105 transition-transform duration-300 ease-in-out shadow-md hover:shadow-lg"
        >
          Update
        </button>
      </form>
    </div>
  );
}
