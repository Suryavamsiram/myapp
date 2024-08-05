// routes/flashcards.js
const express = require('express');
const Flashcard = require('../models/Flashcard');
const auth = require('../middlewares/auth');

const router = new express.Router();

// Create a new flashcard
router.post('/flashcards', auth, async (req, res) => {
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
});

// Get all flashcards for the authenticated user
router.get('/flashcards', auth, async (req, res) => {
  try {
    await req.user.populate('flashcards');
    res.send(req.user.flashcards);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a flashcard
router.patch('/flashcards/:id', auth, async (req, res) => {
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
});

// Delete a flashcard
router.delete('/flashcards/:id', auth, async (req, res) => {
  try {
    const flashcard = await Flashcard.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!flashcard) {
      return res.status(404).send();
    }

    res.send(flashcard);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;