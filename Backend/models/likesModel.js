const mongoose = require('mongoose');

const likesSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user', 
    required: true 
    
  },
  blog: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'blog', 
    required: true 
    
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
    
  }
});

const likesModel = mongoose.model('likes', likesSchema);
module.exports = likesModel;
