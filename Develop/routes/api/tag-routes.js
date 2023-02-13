const express = require("express");
const router = express.Router();
const Tag = require("../models/tag");

// Get all tags
router.get("/", async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific tag by ID
router.get("/:id", getTag, (req, res) => {
  res.json(res.tag);
});

// Create a new tag
router.post("/", async (req, res) => {
  const tag = new Tag({
    name: req.body.name,
  });

  try {
    const newTag = await tag.save();
    res.status(201).json(newTag);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a tag by ID
router.patch("/:id", getTag, async (req, res) => {
  if (req.body.name != null) {
    res.tag.name = req.body.name;
  }

  try {
    const updatedTag = await res.tag.save();
    res.json(updatedTag);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a tag by ID
router.delete("/:id", getTag, async (req, res) => {
  try {
    await res.tag.remove();
    res.json({ message: "Deleted tag" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getTag(req, res, next) {
  try {
    tag = await Tag.findById(req.params.id);
    if (tag == null) {
      return res.status(404).json({ message: "Cannot find tag" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.tag = tag;
  next();
}

module.exports = router;