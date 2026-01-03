const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'

  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comment'

  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const blogModel = mongoose.model('blog', blogSchema);
module.exports = blogModel;
