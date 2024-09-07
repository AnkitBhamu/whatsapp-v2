import React, { useState } from "react";
import Chat from "./Chat";
import ChatBar from "./ChatBar";
import { SocketContextProvider } from "./SocketContextProvider";

export default function Home() {
  let [chat_selected, setSelected] = useState(null);
  return (
    <SocketContextProvider>
      <div className="flex h-screen">
        <ChatBar chat_selector={setSelected} />
        {chat_selected ? <Chat chat_data={chat_selected} /> : null}
      </div>
    </SocketContextProvider>
  );
}
