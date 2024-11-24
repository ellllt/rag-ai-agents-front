"use client";

import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([
    { content: "こんにちは！どういったご質問ですか？", sender: "bot" },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!query.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { content: query, sender: "user" },
    ]);

    setQuery("");
    setLoading(true);

    try {
      const response = await fetch(process.env.API_URL + "/api/stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query }),
      });

      if (response.ok) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let message = "";

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            message += decoder.decode(value, { stream: true });

            setMessages((prevMessages) => [
              ...prevMessages,
              { content: message, sender: "bot" },
            ]);
          }
        }
      } else {
        console.error("API request failed");
        setMessages((prevMessages) => [
          ...prevMessages,
          { content: "エラーが発生しました。再試行してください。", sender: "bot" },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: "エラーが発生しました。再試行してください。", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white text-black">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-2xl">
        <div className="chat-box w-full p-6 bg-white rounded-xl shadow-md overflow-y-auto border border-black/[0.1]">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message p-4 rounded-lg max-w-[80%] text-lg ${
                message.sender === "bot" ? "text-black" : "bg-gray-100 text-black ml-auto my-4"
              }`}
            >
              {message.content}
            </div>
          ))}
        </div>
        <div className="input-area flex gap-4 items-center w-full">
          <input
            className="w-full p-4 rounded-lg border border-black/[0.1] bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black text-lg"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="質問を入力してください..."
          />
          <button
            className="px-6 py-4 bg-black text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 transition text-lg whitespace-nowrap"
            onClick={handleSend}
            disabled={loading}
          >
            {loading ? "送信中..." : "送信"}
          </button>
        </div>
      </main>
    </div>
  );
}
