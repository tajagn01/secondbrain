const express = require('express');
const mongoose = require('mongoose');
const { Usermodel, contentmodel } = require('./model/db.js');
const jwt = require('jsonwebtoken');
const { userMiddleware } = require('./model/middleware.js');


const app = express();
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


// Generate a share link for the logged-in user's brain
app.post("/api/v1/sharebrain", userMiddleware, async (req, res) => {
  // For simplicity, use the user's id as the share link
  const shareLink = req.userId;
  res.json({ shareLink: shareLink });
});

// Fetch all content for a given userId (shareLink)
app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const userId = req.params.shareLink;
  try {
    const content = await contentmodel.find({ userId }).populate("userId", "username");
    res.json({ content });
  } catch (err) {
    res.status(500).json({ message: "Error fetching shared brain", error: err.message });
  }
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});