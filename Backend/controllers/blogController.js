const mongoose = require("mongoose");
const blogModel = require('../models/blogModel');
const likesModel = require('../models/likesModel'); // <--- MAYBE needed later
const commentModel = require('../models/commentModel'); // <--- MUST import
const userModel = require('../models/userModel');       // <--- optional if populating author


const createBlog = async (req, res) => {
    try {
        const { title, content, image, category } = req.body;

        if (!title || !content || !category) {
            return res.status(400).json({ message: "Title, content, and category are required" });
        }

        const newBlog = new blogModel({
            title,
            content,
            category,
            image: image || '',
            author: req.user.userId
        });

        await newBlog.save();

        // Optionally populate author info
        await newBlog.populate('author', 'name email');

        res.status(201).json({
            message: "Blog created successfully",
            blog: newBlog
        });

    } catch (error) {
        console.error("Error creating blog:", error);
        res.status(500).json({
            message: "Error creating blog",
            error: error.message
        });
    }
};


const getBlogs = async (req, res) => {
    try {
        const blogs = await blogModel
            .find()
            .populate('author', 'username email')
            .populate({
                path: 'comments',
                populate: {
                    path: 'author',
                    select: 'username email',
                    model: 'user'
                }
            })
            .sort({ createdAt: -1 }); // Sort by newest first

        console.log(`Found ${blogs.length} blogs`); // Debug log

        res.status(200).json({
            success: true,
            count: blogs.length,
            blogs
        });
    } catch (error) {
        console.error("Error fetching blogs:", error.message);
        res.status(500).json({
            success: false,
            message: "Error fetching blogs",
            error: error.message
        });
    }
};

const getSingleBlog = async (req, res) => {
   
    try {
        const { id } = req.params;


        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid blog ID",
            });
        }

        const blog = await blogModel.findById(id)
            .populate("author", "username");

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        res.status(200).json({
            success: true,
            blog,
        });

    } catch (error) {
        console.error("Error fetching blog:", error.message);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

const getMyBlog = async (req,res)=>{

    try {
        const userId = req.user.userId;
        const blogs = await blogModel.find({ author: userId })
            .populate('author', 'username email')
            .populate({
                path: 'comments',
                populate: {
                    path: 'author',
                    select: 'username email',
                    model: 'user'
                }
            });

        res.status(200).json({
            success: true,
            count: blogs.length,
            blogs
        });
    } catch (error) {
        console.error("Error fetching my blogs:", error.message);
        res.status(500).json({
            success: false,
            message: "Error fetching my blogs",
            error: error.message
        });
    }
};

const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, image, category } = req.body;

        const blog = await blogModel.findById(id);
        if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

        if (blog.author.toString() !== req.user.userId.toString()) {
            return res.status(403).json({ success: false, message: "Unauthorized to update this blog" });
        }

        const updatedBlog = await blogModel.findByIdAndUpdate(
            id,
            { title, content, image, category },
            { new: true }
        ).populate('author', 'username email');

        res.status(200).json({ success: true, message: "Blog updated successfully", blog: updatedBlog });

    } catch (error) {
        console.error("Error updating blog:", error.message);
        res.status(500).json({ success: false, message: "Error updating blog", error: error.message });
    }
};

// Delete blog
const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findById(id);
        if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

        if (blog.author.toString() !== req.user.userId.toString()) {
            return res.status(403).json({ success: false, message: "Unauthorized to delete this blog" });
        }

        await blogModel.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Blog deleted successfully" });

    } catch (error) {
        console.error("Error deleting blog:", error.message);
        res.status(500).json({ success: false, message: "Error deleting blog", error: error.message });
    }
};

// Like / Unlike blog
const likesBlog = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const userId = req.user.userId;

    const alreadyLiked = blog.likes.includes(userId);

    if (alreadyLiked) {
      blog.likes.pull(userId); // unlike
    } else {
      blog.likes.push(userId); // like
    }

    await blog.save();

    const updatedBlog = await blogModel.findById(blog._id)
      .populate("author", "username");

    res.status(200).json(updatedBlog); // 🔥 IMPORTANT
  } catch (error) {
    console.error("Like error:", error);
    res.status(500).json({ message: "Like failed" });
  }

};

// Add comment to blog
const commentBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.userId;

    if (!content) {
      return res.status(400).json({ message: "Comment content required" });
    }

    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const newComment = new commentModel({
  content,
  author: userId,
  blog: id   
});


    await newComment.save();

    blog.comments.push(newComment._id);
    await blog.save();


    const updatedBlog = await blogModel
      .findById(id)
      .populate("author", "username")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "username",
        },
      });

    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error("Comment error:", error);
    res.status(500).json({ message: "Comment failed" });
  }
};

module.exports = {
    createBlog,
    getBlogs,
    deleteBlog,
    updateBlog,
    likesBlog,
    commentBlog,
    getSingleBlog,
    getMyBlog
};
