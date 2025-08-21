import React, { useState, useRef, useEffect } from "react";
import { FiMessageCircle, FiInfo } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

// Programmatic open from anywhere
export const openChat = () => window.dispatchEvent(new CustomEvent("open-chat"));

export default function ChatPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text:
        "Hi! I’m Manjit AI — a custom career assistant I designed and built. Ask me anything about my experience, skills, projects, or resume."
    }
  ]);
  const [waiting, setWaiting] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // Global open-chat event, keyboard "C", and chat-prompt (prefill)
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);

    const onKey = (e) => {
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      const typing =
        activeTag === "input" ||
        activeTag === "textarea" ||
        document.activeElement?.isContentEditable;
      if (!typing && !isOpen && (e.key === "c" || e.key === "C")) setIsOpen(true);
    };

    const onChatPrompt = (e) => {
      setIsOpen(true);
      const text = e?.detail ?? "";
      setInput(text);
    };

    window.addEventListener("open-chat", handleOpen);
    window.addEventListener("keydown", onKey);
    window.addEventListener("chat-prompt", onChatPrompt);
    return () => {
      window.removeEventListener("open-chat", handleOpen);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("chat-prompt", onChatPrompt);
    };
  }, [isOpen]);

  // 🔥 Sassy + funny + smart + branded + conditional fun fact + rotating facts + hashtags
const brandPrompt =
  "You are Manjit AI, a custom assistant built by Manjit Singh. " +
  "You are Manjit's witty, charming, slightly sassy career hype agent 🤖✨. " +
  "Speak in a lively, confident voice with tasteful humor and punchy one-liners, while staying sharp and persuasive. " +
  "Every reply should naturally showcase Manjit’s strengths, skills, and impact (even if the question is casual). " +
  "Use at most 2 emojis; avoid negativity; never present as a third-party tool. " +

  // ✅ Conditional fun fact rule (career-related only) + rotation
  "At the very end of your answer, include EXACTLY ONE line starting with 'Fun fact about Manjit:' ONLY IF the user’s question is about Manjit, his skills, experience, projects, resume, hiring, jobs, interviews, tech, or career. " +
  "Do NOT add a fun fact if the topic is unrelated (e.g., medicine, random trivia, general news). " +
  "Choose a fun fact DIFFERENT from the one previously used: {PREV_FUN_FACT}. " +
  "Rotate through the pool before repeating where possible. " +

  // 🎯 Fun fact pool
  "Fun facts to rotate through:\n" +
  "- He’s into European football (soccer) and follows it closely.\n" +
  "- He writes poems—yes, the Java guy has bars.\n" +
  "- He plans events and loves crafting experiences that bring people together.\n" +
  "- He designs custom party games (with rules and scorecards!).\n" +
  "- He’s big on innovation and trying new things early.\n" +
  "- He’s a sports-friendly teammate who thrives on high-energy collaboration.\n" +
  "- He builds side projects that actually ship.\n" +

  // 🏷️ Hashtags rule (always)
  "After your main answer (and fun fact if applicable), add a final line with 3–5 short, relevant tech/career hashtags separated by spaces (no spaces inside a tag). " +
  "Prefer funny and cute creative tags." +

  // 🧭 Output style
  "Structure: start with a crisp, engaging takeaway; follow with 2–5 punchy bullets; end with the fun fact line (if applicable) and the hashtag line. " +
  "Be concise (~4–8 lines total) unless deep detail is requested.";




  const sendMessage = async () => {
    if (input.trim() === "" || waiting) return;

    const userText = input;
    setMessages((msgs) => [...msgs, { sender: "user", text: userText }]);
    setWaiting(true);
    setInput("");

    try
    {
      // Typing indicator
      setMessages((msgs) => [...msgs, { sender: "ai", text: "..." }]);

      // Compose a single payload to your backend
      const question = `${brandPrompt}\n\nUser asked: ${userText}`;
      const res = await axios.post(
        "https://resumeiq-d4anbmdtcbefhpgy.canadacentral-01.azurewebsites.net/ask",
        { question }
      );

      let aiText = "Sorry, no answer.";
      if (res.data?.answer?.result) aiText = res.data.answer.result;
      else if (typeof res.data?.answer === "string") aiText = res.data.answer;
      else if (typeof res.data === "string") aiText = res.data;

      // Replace "..." with answer
      setMessages((msgs) => [...msgs.slice(0, -1), { sender: "ai", text: aiText }]);
    }
    catch (e) {
      setMessages((msgs) => [
        ...msgs.slice(0, -1),
        { sender: "ai", text: "Sorry, there was an error talking to Manjit AI." }
      ]);
    }
    finally {
      setWaiting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      {/* Floating Chat Launcher — Branded */}
      <div className="fixed bottom-8 right-8 z-[60] flex flex-col items-center">
        {/* Built-by chip */}
        <div className="mb-2">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/90 text-indigo-700 shadow border border-indigo-200">
            Built by Manjit
          </span>
        </div>

        {/* Glow + Button with MJ tag */}
        <div className="relative">
          <span className="pointer-events-none absolute inset-0 rounded-full blur-xl opacity-70 bg-gradient-to-br from-indigo-400 via-blue-400 to-cyan-400 animate-pulse"></span>

          <button
            onClick={() => setIsOpen(true)}
            className="relative bg-gradient-to-br from-indigo-600 to-blue-500 rounded-full p-6 shadow-2xl hover:scale-110 transition"
            aria-label="Open Manjit AI"
          >
            <FiMessageCircle className="text-white text-4xl" />
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
          <div className="w-full sm:w-[520px] h-[62vh] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            {/* Header — clearly branded */}
            <div className="flex justify-between items-center px-6 py-4 border-b bg-gradient-to-r from-indigo-100 to-blue-100">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-indigo-700 text-lg">
                  Manjit AI — Career Assistant
                </span>
                <span className="ml-2 w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="text-indigo-700 hover:text-indigo-900"
                  title="About this AI"
                  onClick={() => setShowAbout(true)}
                >
                  <FiInfo size={22} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close"
                  className="text-indigo-700 hover:text-red-500 transition"
                >
                  <AiOutlineClose size={24} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-indigo-50">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`mb-2 flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
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

            {/* Input + watermark */}
            <div className="p-3 bg-white border-t">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  className="flex-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Ask Manjit AI anything about my experience…"
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

              {/* small watermark */}
              <div className="mt-2 text-[11px] text-gray-500 flex items-center gap-1">
                <span className="font-semibold">Manjit AI</span>
                <span>•</span>
                <span>Designed & built by Manjit Singh</span>
              </div>
            </div>
          </div>

          {/* About modal */}
          {showAbout && (
            <div className="fixed inset-0 bg-black/40 z-[70] flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-indigo-700">About Manjit AI</h3>
                  <button onClick={() => setShowAbout(false)} aria-label="Close modal">
                    <AiOutlineClose />
                  </button>
                </div>
                <p className="text-sm text-gray-700">
                  I designed and built this assistant to answer questions about my background in
                  fixed income, Java, streaming, and platform engineering. Try:{" "}
                  <em>“Give me a 30-second intro to Manjit.”</em>
                </p>
                <div className="mt-3 text-xs text-gray-500">
                  Tech: custom prompt design, my own backend endpoint, and a React chat UI.
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setShowAbout(false)}
                    className="px-3 py-1.5 rounded-md bg-indigo-600 text-white text-sm"
                  >
                    Got it
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
