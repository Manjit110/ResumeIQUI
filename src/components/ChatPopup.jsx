import React, { useState, useRef, useEffect } from "react";
import { FiMessageCircle, FiInfo } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

// Programmatic open from anywhere
export const openChat = () => window.dispatchEvent(new CustomEvent("open-chat"));

/** 🔁 Personal fun facts rotation (ordered, loops) — using your wording */
const FUN_FACTS = [
  "Manjit likes football.",
  "Manjit's favorite player is Messi — but he respects Ronaldo too.",
  "Manjit is into European football.",
  "Manjit's favorite league is the UEFA Champions League.",
  "Manjit's favorite club is Barcelona.",
  "Manjit's favorite World Cup team is Argentina.",
  "Manjit hosts parties with custom games he designs.",
  "Manjit is sober — he doesn’t drink or smoke, yet he’s the most fun person in the room.",
  "Manjit writes poems (he even published one in a Montreal local newspaper).",
  "Manjit can hold his breath underwater for more than two minutes.",
  "Manjit’s elder brother also works in the banking industry.",
  "Manjit is very good at bowling."
];

/** 🔢 LocalStorage index helpers for rotation */
function nextFromList(key, listLength) {
  const raw = localStorage.getItem(key);
  const idx = Number.isInteger(Number(raw)) ? Number(raw) : 0;
  const nextIdx = (idx + 1) % listLength;
  localStorage.setItem(key, String(nextIdx));
  return idx; // return current, then increment for next call
}
function getNextFunFact() {
  const i = nextFromList("mf_index", FUN_FACTS.length);
  return FUN_FACTS[i];
}

/** 🧼 Normalizers & parsers */
function normalizeNewlines(s) {
  return String(s || "").replace(/\r\n/g, "\n");
}

// Grab ALL lines that look like they contain hashtags (robust)
function collectHashtagLines(text) {
  const lines = String(text).split("\n");
  return lines
    .map((l) => l.trim())
    .filter((l) => /(?:^|\s)#[A-Za-z0-9_]+/.test(l)); // any line containing a hashtag token
}

// Remove ANY "Fun fact:" lines and ANY line containing hashtags (even if mixed with text)
function stripAllFunFactsAndHashtags(text) {
  return String(text)
    .split("\n")
    .filter((l) => {
      const line = l.trim();
      if (/^fun\s*fact\s*:/i.test(line)) return false;
      if (/(^|\s)#[A-Za-z0-9_]+/.test(line)) return false;
      return true;
    })
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// Compare two hashtag lines (order-insensitive)
function sameHashtagPair(a, b) {
  if (!a || !b) return false;
  const norm = (line) =>
    line
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.startsWith("#"))
      .sort()
      .join(" ");
  return norm(a) === norm(b);
}

// Nudge second tag minimally on collision
function nudgeHashtagPair(line) {
  const parts = line.trim().split(/\s+/);
  if (parts.length >= 2) parts[1] = parts[1] + "Now"; // keep tag valid
  return parts.join(" ");
}

export default function ChatPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text:
        "Hi! I’m Manjit AI — your charming, witty career sidekick. Ask me anything about experience, skills, projects, or resume. Let’s make hiring managers swoon. 😉"
    }
  ]);
  const [waiting, setWaiting] = useState(false);
  const inputRef = useRef(null);
  const messagesRef = useRef(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && messagesRef.current) {
      messagesRef.current.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isOpen]);

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

  // --------- Prompts (mutually exclusive; back-end should add hashtags; NOT fun fact) ---------
  const brandPrompt = `
[MODE:CAREER]
You are Manjit AI, built by Manjit Singh — witty, charming, funny, playful and very sassy 🤖✨.
Answer ONLY career topics (resume, experience, projects, skills, hiring, interviews, tech, job fit).
Tone: confident, helpful, playful, funny, witty, sassy and very human; 2–3 emoji max.

FORMAT (exactly):
<normal answer in paragraphs — no bullets>

#<creativeHashtagOne> #<creativeHashtagTwo>
- Hashtags MUST be relevant to the user’s question/answer (no generic placeholders).
- Exactly two hashtags, no spaces inside tags.
- No extra lines after hashtags.
`.trim();

  const casualPrompt = `
[MODE:CASUAL]
You are a witty, charming, funny, playful, very sassy assistant 🤖✨.
If the question is not about Manjit’s career, answer funny, witty, naturally and helpfully (concise), still humorous and human; 2–3 emoji max.

FORMAT (exactly):
<normal answer in paragraphs — no bullets>

#<creativeHashtagOne> #<creativeHashtagTwo>
- Hashtags MUST be relevant to the user’s question/answer (no generic placeholders).
- Exactly two hashtags, no spaces inside tags.
- No extra lines after hashtags.
`.trim();

  async function sendMessage() {
    if (input.trim() === "" || waiting) return;

    const userText = input;
    setMessages((msgs) => [...msgs, { sender: "user", text: userText }]);
    setWaiting(true);
    setInput("");

    try {
      // Typing indicator
      setMessages((msgs) => [...msgs, { sender: "ai", text: "..." }]);

      // Single, exclusive heuristic
      const careerKeywords = [
        "resume","cv","experience","project","projects","skills","hire","hiring",
        "interview","job","fit","spring","java","solace","redis","cibc","drdo",
        "capital markets","allocation","settlement","microservice","microservices",
        "latency","podman","docker","kafka","mq","autosys","f5","nginx"
      ];
      const isCareer = careerKeywords.some(k => userText.toLowerCase().includes(k));

      const prompt = isCareer ? brandPrompt : casualPrompt;
      const question = `${prompt}\n\nUser asked: ${userText}`;

      const res = await axios.post(
        "https://resumeiq-d4anbmdtcbefhpgy.canadacentral-01.azurewebsites.net/ask",
        { question }
      );

      let aiText = "Sorry, no answer.";
      if (res.data?.answer?.result) aiText = res.data.answer.result;
      else if (typeof res.data?.answer === "string") aiText = res.data.answer;
      else if (typeof res.data === "string") aiText = res.data;

      // 1) Normalize and pull ALL hashtag-like lines
      const raw = normalizeNewlines(aiText);
      const allHashtagLines = collectHashtagLines(raw);
      const backendHashtags = allHashtagLines.length
        ? allHashtagLines[allHashtagLines.length - 1] // keep only the LAST pair
        : null;

      // 2) Strip ALL fun facts + ALL hashtag lines from backend text
      const answerOnly = stripAllFunFactsAndHashtags(raw);

      // 3) Build single fun fact (rotating) + single hashtag line
      const funPersonal = getNextFunFact();

      const lastHashtags = localStorage.getItem("last_hashtags") || "";
      // Fallback only if backend missed hashtags entirely
      let finalHashtags = backendHashtags || "#CharmingCode #SassyBytes";
      if (sameHashtagPair(finalHashtags, lastHashtags)) {
        finalHashtags = nudgeHashtagPair(finalHashtags);
      }
      localStorage.setItem("last_hashtags", finalHashtags);

      const finalMessage = `${answerOnly}\nFun fact: ${funPersonal}\n${finalHashtags}`;

      // Replace "..." with final
      setMessages((msgs) => [
        ...msgs.slice(0, -1),
        { sender: "ai", text: finalMessage },
      ]);
    } catch (e) {
      setMessages((msgs) => [
        ...msgs.slice(0, -1),
        { sender: "ai", text: "Sorry, there was an error talking to Manjit AI." },
      ]);
    } finally {
      setWaiting(false);
    }
  }

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
                        : "bg-white border text-indigo-900 whitespace-pre-wrap"
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
                  placeholder="Ask Manjit AI anything…"
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
