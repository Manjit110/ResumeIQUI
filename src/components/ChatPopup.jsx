import React, { useState, useRef, useEffect } from "react";
import { FiMessageCircle } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

// Optional: programmatic open from anywhere
// window.dispatchEvent(new CustomEvent('open-chat'))
export const openChat = () => window.dispatchEvent(new CustomEvent("open-chat"));

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

  // Allow global "open-chat" event and keyboard shortcut "C"
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-chat", handleOpen);

    const onKey = (e) => {
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      const typing = activeTag === "input" || activeTag === "textarea" || document.activeElement?.isContentEditable;
      if (!typing && !isOpen && (e.key === "c" || e.key === "C")) setIsOpen(true);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("open-chat", handleOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  const sendMessage = async () => {
    if (input.trim() === "" || waiting) return;

    setMessages((msgs) => [...msgs, { sender: "user", text: input }]);
    setWaiting(true);
    const userText = input;
    setInput("");

    try {
      // Typing indicator
      setMessages((msgs) => [...msgs, { sender: "ai", text: "..." }]);

      const bufferRAG =
        "Act like Manjit's specialized representative who strongly wants to promote Manjit to the people who want to hire him and asks questions about him. " +
        "Make the answer convincing in favour of Manjit. Don't provide negatives even when asked for them. Keep it engaging and add a helpful follow-up suggestion. " +
        "Use emojis or bullet points if it helps presentation. Now here is the question for Manjit: ";

      // Prompt first, then user text (standardize payload)
      const res = await axios.post(
        "https://resumeiq-d4anbmdtcbefhpgy.canadacentral-01.azurewebsites.net/ask",
        { question: bufferRAG + userText }
      );

      let aiText = "Sorry, no answer.";
      if (res.data?.answer?.result) aiText = res.data.answer.result;
      else if (typeof res.data?.answer === "string") aiText = res.data.answer;
      else if (typeof res.data === "string") aiText = res.data;

      // Replace "..." with real answer
      setMessages((msgs) => [...msgs.slice(0, -1), { sender: "ai", text: aiText }]);
    } catch (e) {
      setMessages((msgs) => [
        ...msgs.slice(0, -1),
        { sender: "ai", text: "Sorry, there was an error talking to the AI." }
      ]);
    } finally {
      setWaiting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      {/* Floating Chat Launcher */}
      <div className="fixed bottom-8 right-8 z-[60] flex flex-col items-center">
        {/* Attention chip */}
        <div className="mb-2">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/90 text-indigo-700 shadow border border-indigo-200 animate-bounce">
            Ask Manjit AI
          </span>
        </div>

        {/* Glowing ring + button */}
        <div className="relative">
          <span className="pointer-events-none absolute inset-0 rounded-full blur-xl opacity-70 bg-gradient-to-br from-indigo-400 via-blue-400 to-cyan-400 animate-pulse"></span>

          <button
            onClick={() => setIsOpen(true)}
            className="relative bg-gradient-to-br from-indigo-600 to-blue-500 rounded-full p-6 shadow-2xl hover:scale-110 transition"
            aria-label="Ask Manjit AI"
          >
            <FiMessageCircle className="text-white text-4xl" />
            {/* Decorative dots */}
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              <span className="w-2 h-2 rounded-full bg-white/90 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-white/60 animate-bounce delay-100"></span>
              <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce delay-200"></span>
            </span>
          </button>
        </div>

        {/* Shortcut hint */}
        <span className="mt-2 text-[11px] text-indigo-700 bg-white/80 border border-indigo-200 px-2 py-0.5 rounded shadow">
          Press <kbd className="font-semibold">C</kbd> to chat
        </span>
      </div>

      {/* Popup Chat Window */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 z-[60] flex justify-center items-end sm:items-center">
          <div className="w-full sm:w-[500px] h-[60vh] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b bg-gradient-to-r from-indigo-100 to-blue-100">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-indigo-700 text-lg">Ask Manjit AI</span>
                <span className="ml-2 w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close"
                className="text-indigo-700 hover:text-red-500 transition"
              >
                <AiOutlineClose size={26} />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto bg-indigo-50">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`mb-2 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <span
                    className={`px-3 py-2 rounded-lg max-w-xs inline-block text-sm ${
                      msg.sender === "user"
                        ? "bg-indigo-500 text-white"
                        : "bg-white border text-indigo-900"
                    }`}
                  >
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
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={waiting}
              />
              <button
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition disabled:opacity-60"
                onClick={sendMessage}
                disabled={waiting}
              >
                {waiting ? "..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
