import React from "react";
import ChatHeader from "./ChatHeader";
import MatchesDisplay from "./MatchesDisplay";
import ChatDisplay from "./ChatDisplay";

export default function ChatContainer({ user }) {
  return (
    <div className="chat-container">
      <ChatHeader user={user} />

      <div>
        <button className="option">Matches</button>
        <button className="option">Chat</button>
      </div>

      <MatchesDisplay />

      <ChatDisplay />
    </div>
  );
}
