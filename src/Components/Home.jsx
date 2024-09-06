import React, { useState } from "react";
import Chat from "./Chat";
import ChatBar from "./ChatBar";

export default function Home() {
  let [chat_selected, setSelected] = useState(null);
  return (
    <div className="flex h-screen">
      <ChatBar chat_selector={setSelected} />
      <Chat chat_data={chat_selected} />
    </div>
  );
}
