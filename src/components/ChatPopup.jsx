import React, { useState, useRef, useEffect } from "react";
import { FiMessageCircle } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

export default function ChatPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi! 👋 I'm Manjit AI, ask me anything about my skills or experience!" }
  ]);
  const [waiting, setWaiting] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // Updated sendMessage function
  const sendMessage = async () => {
    if (input.trim() === "" || waiting) return;
    setMessages(msgs => [
      ...msgs,
      { sender: "user", text: input }
    ]);
    setWaiting(true);
    setInput("");

    try {
      // Add typing indicator
      setMessages(msgs => [
        ...msgs,
        { sender: "ai", text: "..." }
      ]);

      const bufferRAG = "Act like Manjit's specialized representative who strongly wants to promote Manjit to the people who wants to hire him and asks questions about him. Try to make your answer more convincing in favour of manjit. Don't give any negative answers, even when question is to seek some negatives. While giving answer, make sure it's engaging, kind of give a followup suggestion which push conversation in positive direction. If needed do add emojis and give more presentable answer. You cann use bullet point if needed Now here is the question that is requested for Manjit:  "

      // Call FastAPI backend
      const res = await axios.post("https://resumeiq-d4anbmdtcbefhpgy.canadacentral-01.azurewebsites.net/ask", { question: input+bufferRAG });

      // Safely extract answer text
      let aiText = "Sorry, no answer.";
      if (res.data?.answer?.result) {
        aiText = res.data.answer.result;
      } else if (typeof res.data?.answer === "string") {
        aiText = res.data.answer;
      } else if (typeof res.data === "string") {
        aiText = res.data;
      }

      // Remove "..." and add real answer
      setMessages(msgs => [
        ...msgs.slice(0, -1),
        { sender: "ai", text: aiText }
      ]);
    } catch (e) {
      setMessages(msgs => [
        ...msgs.slice(0, -1),
        { sender: "ai", text: "Sorry, there was an error talking to the AI." }
      ]);
    }
    setWaiting(false);
  };

  // For pressing Enter to send
  const handleKeyDown = e => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center">
        <span className="text-xs font-bold mb-1 text-indigo-600 animate-pulse bg-white px-2 py-1 rounded-full shadow border border-indigo-300">
          AI
        </span>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-br from-indigo-500 to-blue-400 rounded-full p-6 shadow-xl hover:scale-110 transition relative"
          aria-label="Ask Manjit AI"
        >
          <FiMessageCircle className="text-white text-4xl" />
          {/* Dots for effect */}
          <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
            <span className="w-2 h-2 rounded-full bg-white opacity-70 animate-bounce"></span>
            <span className="w-2 h-2 rounded-full bg-white opacity-50 animate-bounce delay-100"></span>
            <span className="w-2 h-2 rounded-full bg-white opacity-30 animate-bounce delay-200"></span>
          </span>
        </button>
      </div>

      {/* Popup Chat Window */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-end sm:items-center">
          <div className="w-full sm:w-[500px] h-[60vh] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b bg-gradient-to-r from-indigo-100 to-blue-100">
              <div className="flex items-center gap-2">
                {/* <img src="/profile.jpg" alt="Manjeet" className="w-8 h-8 rounded-full" /> */}
                <span className="font-semibold text-indigo-700 text-lg">Ask Manjit AI</span>
                <span className="ml-2 w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              </div>
              <button onClick={() => setIsOpen(false)} aria-label="Close" className="text-indigo-700 hover:text-red-500 transition">
                <AiOutlineClose size={26} />
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto bg-indigo-50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`mb-2 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <span className={`px-3 py-2 rounded-lg max-w-xs inline-block text-sm ${
                    msg.sender === "user"
                      ? "bg-indigo-500 text-white"
                      : "bg-white border text-indigo-900"
                  }`}>
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>
            <div className="p-3 bg-white flex gap-2 border-t">
              <input
                ref={inputRef}
                className="flex-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Type your message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={waiting}
              />
              <button
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
                onClick={sendMessage}
                disabled={waiting}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
