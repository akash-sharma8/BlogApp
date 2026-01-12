const express = require('express');
const router = express.Router();
const {createBlog, getBlogs,getMyBlog, getSingleBlog, updateBlog, deleteBlog,likesBlog,commentBlog} = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/blogs', authMiddleware, createBlog);

router.get('/blogs', getBlogs);

router.get('/blogs/:id', getSingleBlog);

router.get('/myblogs', authMiddleware, getMyBlog);

router.put("/blogs/:id/like", authMiddleware, likesBlog);

router.post('/blogs/:id/comment', authMiddleware, commentBlog);

router.put('/blogs/:id', authMiddleware, updateBlog);

router.delete('/blogs/:id', authMiddleware, deleteBlog);
router.get('/blogs', (req, res) => {
    res.json({ msg: "Blogs route works" });
  });

module.exports = router;
