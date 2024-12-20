"use client";

import { useChat } from "./hooks/useChat";
import ChatBox from "./components/ChatBox";
import InputArea from "./components/InputArea";

export default function Home() {
  const { query, setQuery, messages, handleSend, loading } = useChat();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white text-black">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-2xl">
        <ChatBox messages={messages} />
        <InputArea query={query} setQuery={setQuery} handleSend={handleSend} loading={loading} />
      </main>
    </div>
  );
}
