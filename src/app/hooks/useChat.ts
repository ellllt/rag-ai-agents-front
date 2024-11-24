"use client";

import { useState } from "react";
import { Message } from "../components/ChatBox";

export const useChat = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([
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
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/stream", {
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

            const cleanMessage = message.replace(/^data:\s*/, "");

            setMessages((prevMessages) => [
              ...prevMessages,
              { content: cleanMessage, sender: "bot" },
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

  return { query, setQuery, messages, handleSend, loading };
};
