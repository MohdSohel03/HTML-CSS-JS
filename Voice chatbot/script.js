const messagesContainer = document.getElementById('messagesContainer');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const synth = window.speechSynthesis;

let messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
renderMessages();

sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const text = messageInput.value.trim();

    if (text) {
        const newMessage = {
            text: text,
            isSent: true,
            timestamp: new Date().toISOString()
        };

        messages.push(newMessage);
        localStorage.setItem('chatMessages', JSON.stringify(messages));

        messageInput.value = '';
        messageInput.focus();
        renderMessages();

        setTimeout(() => {
            const responseText = getAutoResponse(text);
            const responseMessage = {
                text: responseText,
                isSent: false,
                timestamp: new Date().toISOString()
            };
            messages.push(responseMessage);
            localStorage.setItem('chatMessages', JSON.stringify(messages));
            renderMessages();
            speak(responseText);
        }, 1000);
    }
}

function getAutoResponse(input) {
    const responses = {
        'hi': 'Hello! How can I help you?',
        'hello': 'Hi there!',
        'how are you?': 'I am just a chat bot, but I am here to assist you!',
        'bye': 'Goodbye! Have a great day!',
        'who are you?': 'I am a simple chat bot here to chat with you!',
        'what is my name?': 'Your name is Sohel Ansari.',
        'tell me about myself': 'You are a second-year BSc IT student passionate about technology.',
        'who is your admin?': 'My admin is Sohel Ansari, a tech enthusiast!',
        'what can you do?': 'I can chat with you, answer basic questions, and keep you company!'
    };

    return responses[input.toLowerCase()] || 'I am not sure how to respond to that.';
}

function speak(text) {
    if (synth.speaking) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.lang = 'en-US';
    synth.speak(utterance);
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function renderMessages() {
    messagesContainer.innerHTML = '';
    messages.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.isSent ? 'sent' : 'received'}`;
        messageDiv.innerHTML = `<div>${escapeHtml(message.text)}</div>`;
        messagesContainer.appendChild(messageDiv);
    });
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}