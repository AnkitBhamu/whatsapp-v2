import React, { useState } from "react";
import Chat from "./Chat";
import ChatBar from "./ChatBar";
import { SocketContextProvider } from "./SocketContextProvider";
import { MsgstoreProvider } from "./MsgstoreProvider";
import NoChatSelected from "./NoChatSelected";

export default function Home() {
  let [chat_selected, setSelected] = useState(null);
  return (
    <SocketContextProvider>
      <MsgstoreProvider>
        <div className="flex h-screen">
          <ChatBar chat_selector={setSelected} />
          {chat_selected ? (
            <Chat chat_data={chat_selected} />
          ) : (
            <NoChatSelected />
          )}
        </div>
      </MsgstoreProvider>
    </SocketContextProvider>
  );
}
