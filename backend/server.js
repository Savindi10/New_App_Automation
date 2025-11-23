const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("../frontend"));

// MongoDB connection using env variable
const mongoURL = process.env.MONGO_URL || 
  "mongodb://admin:password@mongo:27017/NewAppDB?authSource=admin";

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB error:", err));

// Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  class: String
});

const User = mongoose.model("User", userSchema);

// API endpoint
app.post("/add-user", async (req, res) => {
  const { name, email, class: userClass } = req.body;
  const newUser = new User({ name, email, class: userClass });

  try {
    await newUser.save();
    res.json({ message: "User added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
