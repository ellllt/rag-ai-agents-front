import React from "react";

export type Message = {
  content: string;
  sender: "bot" | "user";
};

type ChatBoxProps = {
  messages: Message[];
};

const formatMessage = (text: string) => {
  const boldText = text.replace(/\*\*(.*?)\*\*/g, (match, p1) => `<strong>${p1}</strong>`);
  const listText = boldText.replace(/^\s*-\s+(.*)$/gm, (match, p1) => {
    return `<li>${p1}</li>`;
  });
  const formattedText = listText.split("\n").map((line, index) => (
    <p key={index} dangerouslySetInnerHTML={{ __html: line }} />
  ));

  return <>{formattedText}</>;
};

const ChatBox: React.FC<ChatBoxProps> = ({ messages }) => {
  return (
    <div className="chat-box w-full p-6 bg-white rounded-xl shadow-md overflow-y-auto border border-black/[0.1]">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`message p-4 rounded-lg max-w-[80%] text-lg ${
            message.sender === "bot" ? "text-black" : "bg-gray-100 text-black ml-auto my-4"
          }`}
        >
          {formatMessage(message.content)}
        </div>
      ))}
    </div>
  );
};

export default ChatBox;
