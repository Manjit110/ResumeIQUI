import React, { useState } from 'react';
import axios from 'axios';

const ChatBox = () => {
  const [input, setInput] = useState('');
  const [responses, setResponses] = useState([]);

  const handleSubmit = async () => {
    const res = await axios.post('https://your-backend.onrender.com/ask', { query: input });
    setResponses([...responses, { user: input, ai: res.data.answer }]);
    setInput('');
  };

  return (
    <div className="w-full max-w-xl">
      <div className="space-y-4 mb-4">
        {responses.map((r, i) => (
          <div key={i} className="bg-white p-4 rounded shadow">
            <p><strong>You:</strong> {r.user}</p>
            <p><strong>AI:</strong> {r.ai}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 rounded border border-gray-300"
          placeholder="Ask me anything about your resume..."
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
