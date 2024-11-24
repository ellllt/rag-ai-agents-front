import React from "react";

type InputAreaProps = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSend: () => void;
  loading: boolean;
};

const InputArea: React.FC<InputAreaProps> = ({ query, setQuery, handleSend, loading }) => {
  return (
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
  );
};

export default InputArea;
