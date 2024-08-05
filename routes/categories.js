// routes/categories.js
const express = require('express');
const Category = require('../models/Category');
const auth = require('../middlewares/auth');

const router = new express.Router();

// Create a new category
router.post('/categories', auth, async (req, res) => {
  const category = new Category(req.body);
  try {
    await category.save();
    res.status(201).send(category);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all categories
router.get('/categories', auth, async (req, res) => {
  try {
    const categories = await Category.find({});
    res.send(categories);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;