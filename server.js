const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/userDB", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Failed to connect to MongoDB", err));

// Define Schema and Model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    service: String,
    comments: String
});

const User = mongoose.model("User", userSchema);

// API Endpoint to Save User Data
app.post("/submit", async (req, res) => {
    try {
        const { name, email, phone, service, comments } = req.body;
        const newUser = new User({ name, email, phone, service, comments });
        await newUser.save();
        res.status(201).send("User data saved successfully!");
    } catch (error) {
        res.status(500).send("Failed to save user data.");
    }
});

// API Endpoint to View All User Data
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send("Failed to fetch users.");
    }
});

// Start the Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

