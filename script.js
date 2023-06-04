document.addEventListener("DOMContentLoaded", function() {
    var apiKey = prompt("Please enter your ChatGPT API key:");
    if (!apiKey) {
        alert("API key is required. Please refresh the page and enter a valid API key.");
        return;
    }

    const chatboxElement = document.getElementById("chatbox");
    const userInputElement = document.getElementById("userInput");
    const sendButton = document.getElementById("sendButton");

    const openai = axios.create({
        baseURL: "https://api.openai.com/v1",
        headers: {
            "Authorization": "Bearer " + apiKey,
            "Content-Type": "application/json"
        }
    });

    async function sendMessage() {
        const userInput = userInputElement.value;
        userInputElement.value = "";
        appendMessage("User: " + userInput, "user-message");

        try {
            const response = await openai.post("/chat/completions", {
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: userInput }
                ]
            });

            const chatbotMessage = response.data.choices[0].message.content;
            appendMessage("ChatGPT: " + chatbotMessage, "chatbot-message");
        } catch (error) {
            console.error("Error:", error);
        }
    }

    function appendMessage(message, className) {
        const messageElement = document.createElement("p");
        messageElement.className = className;
        messageElement.innerText = message;
        chatboxElement.appendChild(messageElement);

        // Automatically scroll to the bottom of the chatbox
        chatboxElement.scrollTop = chatboxElement.scrollHeight;
    }

    sendButton.addEventListener("click", sendMessage);
    userInputElement.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});
