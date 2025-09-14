
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

mongoose.connect("mongodb://localhost:27017/second-brain")
  .then(() => console.log("database is connected"))
  .catch(err => console.error("MongoDB connection error:", err));

const userSchema = new Schema({
    username: { type: String, unique: true },
    password: String
});

const Usermodel = model("User", userSchema);

const contentSchema = new Schema({
  title : String,
  link: String,
  tags : [{ type : mongoose.Types.ObjectId, ref : 'Tag'}],
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
});

const contentmodel = model("content", contentSchema);

// Link model for sharebrain links
const linkSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  shareLink: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

const Linkmodel = model("Link", linkSchema);

module.exports = { Usermodel, contentmodel, Linkmodel };