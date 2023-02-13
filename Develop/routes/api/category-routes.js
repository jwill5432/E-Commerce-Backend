const express = require("express");
const router = express.Router();
const Category = require("../models/category");

// Get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific category by ID
router.get("/:id", getCategory, (req, res) => {
  res.json(res.category);
});

// Create a new category
router.post("/", async (req, res) => {
  const category = new Category({
    name: req.body.name,
  });

  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a category by ID
router.patch("/:id", getCategory, async (req, res) => {
  if (req.body.name != null) {
    res.category.name = req.body.name;
  }

  try {
    const updatedCategory = await res.category.save();
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a category by ID
router.delete("/:id", getCategory, async (req, res) => {
  try {
    await res.category.remove();
    res.json({ message: "Deleted category" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getCategory(req, res, next) {
  try {
    category = await Category.findById(req.params.id);
    if (category == null) {
      return res.status(404).json({ message: "Cannot find category" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.category = category;
  next();
}

module.exports = router;