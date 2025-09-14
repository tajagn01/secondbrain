const express = require('express');
const mongoose = require('mongoose');
const { Usermodel, contentmodel, Linkmodel } = require('./model/db.js');
const jwt = require('jsonwebtoken');
const { userMiddleware } = require('./model/middleware.js');

const cors = require('cors');
const app = express();
app.use(cors());

const port = 3000;
const jwt_password = "123123";

app.use(express.json());





app.post("/api/v1/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    await Usermodel.create({ username, password });
    res.json({ message: "user signed up" });
  } catch (err) {
    res.status(500).json({ message: "Error signing up", error: err.message });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await Usermodel.findOne({ username, password });
    if (existingUser) {
      const token = jwt.sign(
        { id: existingUser._id, username: existingUser.username },
        jwt_password
      );
      res.json({ token });
    } else {
      res.status(403).json({ message: "Incorrect credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error signing in", error: err.message });
  }
});


app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const title = req.body.title;
    const link = req.body.link; 
    const type = req.body.type;
    await contentmodel.create({
        title,
        link,
        type,
        userId: req.userId,
        tags: []
    });
    res.json({ message: "content added" });
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
  const content = await contentmodel.find({
    userId: req.userId
  }).populate("userId", "username")
  res.json({ content });
});


app.delete("/api/v1/content", userMiddleware, async (req, res) => {
  const contentId = req.body.contentId;
  await contentmodel.deleteOne({
    _id: contentId,
    userId: req.userId
  });
  res.json({ message: "deleted" });
});


// Generate or return a single share link for the logged-in user's brain
app.post("/api/v1/sharebrain", userMiddleware, async (req, res) => {
  let linkDoc = await Linkmodel.findOne({ userId: req.userId });
  if (linkDoc) {
    return res.json({ shareLink: linkDoc.shareLink });
  }
  // Generate a random string for the share link
  const shareLink = Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
  linkDoc = await Linkmodel.create({ userId: req.userId, shareLink });
  res.json({ shareLink: linkDoc.shareLink });
});

// Fetch all content for a given shareLink
app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const shareLink = req.params.shareLink;
  try {
    const linkDoc = await Linkmodel.findOne({ shareLink });
    if (!linkDoc) {
      return res.status(404).json({ message: "Share link not found" });
    }
    const content = await contentmodel.find({ userId: linkDoc.userId }).populate("userId", "username");
    res.json({ content });
  } catch (err) {
    res.status(500).json({ message: "Error fetching shared brain", error: err.message });
  }
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});