const messages = [
		{ sender: "Amit", text: "You up?" },
		{ sender: "Bao", text: "Good" },
];

function addMessage({ sender, text }) {
  messages.push(
    {
        sender: sender,
        text: text
    }
  )
}

function getMessages() {
  return messages
}

const chat = {
  addMessage,
  getMessages,
};

module.exports = chat;
