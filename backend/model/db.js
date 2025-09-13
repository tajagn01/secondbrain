
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

module.exports = { Usermodel, contentmodel };