const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  parent: {
    type: String,
    required: true
  },
  child: {
    type: [String],
    required: true
  }
}, {
  collection: 'category'
});

module.exports = mongoose.model('Category', categorySchema);
