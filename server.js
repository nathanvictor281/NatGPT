const express = require('express');
const app = express();
const port = 5000;

// Middleware for parsing JSON request bodies
app.use(express.json());

// Route for handling chat messages
app.post('/api/chat', (req, res) => {
    const message = req.body.message;

    // Handle the chat message here and generate a response
    // Implement your logic to interact with the ChatGPT API

    const chatbotMessage = "This is the chatbot's response";
    res.json({ message: chatbotMessage });
});

// Route for saving chat messages
app.post('/api/save-chat', (req, res) => {
    const chatMessages = req.body.chatMessages;

    // Handle saving the chat messages to a database or file here
    // Implement your logic to save the chat messages

    res.sendStatus(200);
});

// Route for deleting chat messages
app.post('/api/delete-chat', (req, res) => {
    // Handle deleting the chat messages here
    // Implement your logic to delete the chat messages

    res.sendStatus(200);
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
