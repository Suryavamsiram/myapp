// controllers/flashcardController.js
const Flashcard = require('../models/Flashcard');

// Create flashcard
exports.create = async (req, res) => {
  const flashcard = new Flashcard({
    ...req.body,
    user: req.user._id
  });
  try {
    await flashcard.save();
    res.status(201).send(flashcard);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get flashcards
exports.getAll = async (req, res) => {
  try {
    await req.user.populate('flashcards');
    res.send(req.user.flashcards);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update flashcard
exports.update = async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const flashcard = await Flashcard.findOne({ _id: req.params.id, user: req.user._id });

    if (!flashcard) {
      return res.status(404).send();
    }

    updates.forEach((update) => flashcard[update] = req.body[update]);
    await flashcard.save();
    res.send(flashcard);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete flashcard
exports.delete = async (req, res) => {
  try {
    const flashcard = await Flashcard.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!flashcard) {
      return res.status(404).send();
    }

    res.send(flashcard);
  } catch (error) {
    res.status(500).send(error);
  }
};