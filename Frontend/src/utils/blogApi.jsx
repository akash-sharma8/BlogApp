import API from "./api";

export const getBlogs = () => API.get("/blog/blogs");
export const getSingleBlog = (id) => API.get(`/blog/blogs/${id}`);
export const createBlog = (data) => API.post("/blog/blogs", data);
export const updateBlog = (id, data) => API.put(`/blog/blogs/${id}`, data);
export const deleteBlog = (id) => API.delete(`/blog/blogs/${id}`);
export const likeBlog = (id) => API.put(`/blog/blogs/${id}/like`);
export const getMyBlog = () => API.get("/blog/myblogs");
export const commentBlog = async (id, content) => {
  const token = localStorage.getItem("token");

  return API.post(
    `/blog/blogs/${id}/comment`,
    { content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
