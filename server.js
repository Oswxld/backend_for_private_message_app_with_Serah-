// server.js
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(cors());          // allow your app to talk to server
app.use(express.json());   // parse JSON bodies

const MESSAGES_FILE = "messages.json";

// Ensure messages file exists
if (!fs.existsSync(MESSAGES_FILE)) fs.writeFileSync(MESSAGES_FILE, "[]");

// Get all messages
app.get("/messages", (req, res) => {
  const messages = JSON.parse(fs.readFileSync(MESSAGES_FILE));
  res.json(messages);
  console.log("Messages sent to client at " + new Date().toISOString());
});

// Add a new message
app.post("/messages", (req, res) => {
  const messages = JSON.parse(fs.readFileSync(MESSAGES_FILE));
  const { sender, text } = req.body;
  const newMessage = { sender, text, time: new Date().toISOString() };
  messages.push(newMessage);
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
  res.json(newMessage);
    console.log("New message received from " + sender + " at " + new Date().toISOString());
});

app.listen(3000, () => console.log("Messages server running on port 3000"));
