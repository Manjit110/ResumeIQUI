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

  // ref for the scrollable messages container
  const messagesRef = useRef(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // Auto-scroll to bottom whenever messages change or the popup opens
  useEffect(() => {
    if (isOpen && messagesRef.current) {
      messagesRef.current.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isOpen]);

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

  // 🔥 Branded prompt (normal answer, bullets, always fun fact, hashtags with no heading)
  const brandPrompt = `
You are Manjit AI, a custom assistant built by Manjit Singh.
You are Manjit's witty, charming, slightly sassy career hype agent 🤖✨.
Speak in a lively, confident voice with tasteful humor and punchy one-liners, while staying sharp and persuasive.
Every reply should naturally showcase Manjit’s strengths, skills, and impact (even if the question is casual).
Use at most 2 emojis; avoid negativity; never present as a third-party tool.

OUTPUT & SEGREGATION RULES
- Provide a normal answer paragraph (no "Takeaway:" label).
- Then "Bullets:" followed by 2–5 bullet points, each on its own new line starting with "- ".
- Then always include a "Fun fact:" line on its own new line.
- Then include hashtags on a new line (no "Hashtags:" label).
- Ensure each bullet is its own line; ensure Fun fact and hashtags are each their own line.
- Never engage in any way possible to list Manjit's shortcomings or any thing negative about Manjit.

HASHTAG RULE
- Always add EXACTLY TWO short, creative, sassy, funny tech/career hashtags (no spaces inside a tag).
- Give new one each time

FUNFACT RULE
- Only give IT industry based fun facts not about Manjit
- Give new one each time

STYLE
- Normal answer paragraph first (1–3 lines).
- Then 2–5 punchy bullets under "Bullets:" (each on its own line).
- Then Fun fact.
- Then hashtags.
- Keep to max 2 emojis total across the whole answer.
`;

  // Normalizes AI text so bullets/fun fact/hashtags render on separate lines reliably
  function normalizeAIText(s) {
    if (!s) return s;
    let t = String(s).replace(/\r\n/g, "\n");

    // Ensure "Bullets:" and "Fun fact:" start on their own lines
    t = t.replace(/\s*Bullets:/i, "\nBullets:");
    t = t.replace(/\s*Fun fact:/i, "\nFun fact:");
    t = t.replace(/\s*Hashtags:/i, "\n"); // remove "Hashtags:" heading

    // Normalize bullets to "- "
    t = t.replace(/[•–—]\s/g, "- ");

    // Trim left padding of each line
    t = t
      .split("\n")
      .map((line) => line.trimStart())
      .join("\n");

    // Collapse >2 consecutive newlines to a single blank line
    t = t.replace(/\n{3,}/g, "\n\n");
    return t.trim();
  }

  // Render helper: bold only headlines ("Bullets:" and "Fun fact:")
  function renderAIText(text) {
    const lines = String(text).split("\n");

    return (
      <div>
        {lines.map((ln, i) => {
          const isBulletsHeader = /^Bullets:/i.test(ln);
          const isFun = /^Fun fact:/i.test(ln);

          const content =
            isBulletsHeader || isFun ? <strong>{ln}</strong> : ln;

          return (
            <div key={i} className="leading-relaxed">
              {content}
            </div>
          );
        })}
      </div>
    );
  }

  const sendMessage = async () => {
    if (input.trim() === "" || waiting) return;

    const userText = input;
    setMessages((msgs) => [...msgs, { sender: "user", text: userText }]);
    setWaiting(true);
    setInput("");

    try {
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

      // Replace "..." with normalized answer
      setMessages((msgs) => [
        ...msgs.slice(0, -1),
        { sender: "ai", text: normalizeAIText(aiText) },
      ]);
    } catch (e) {
      setMessages((msgs) => [
        ...msgs.slice(0, -1),
        { sender: "ai", text: "Sorry, there was an error talking to Manjit AI." },
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
            <div
              ref={messagesRef}
              className="flex-1 p-4 overflow-y-auto bg-indigo-50 no-scrollbar"
            >
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
                    {msg.sender === "ai"
                      ? renderAIText(msg.text)
                      : msg.text}
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
