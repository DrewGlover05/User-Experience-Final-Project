import './App.css'

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>AI Assistant</h1>
        <p>Your personal booking assistant</p>
      </header>

      <main className="chat-container">
        <div className="avatar">
          <div className="avatar-circle">
            🤖
          </div>
          <h2>Assistant</h2>
          <p>How can I help you today?</p>
        </div>

        <div className="chat-window">
          <div className="message assistant-message">
            Hello! Welcome. I'm your virtual assistant.
            What can I help you with today?
          </div>
        </div>

        <div className="input-area">
          <input
            type="text"
            placeholder="Type your message..."
          />
          <button>Send</button>
          <button>🎤</button>
        </div>
      </main>
    </div>
  )
}

export default App