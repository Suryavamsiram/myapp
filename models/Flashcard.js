// models/Flashcard.js
const mongoose = require('mongoose');

const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true
  },
  answer: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true
});

const Flashcard = mongoose.model('Flashcard', flashcardSchema);
module.exports = Flashcard;


module.exports = mongoose.model('Flashcard', flashcardSchema);