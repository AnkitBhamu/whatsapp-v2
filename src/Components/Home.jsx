import React, { useState } from "react";
import Chat from "./Chat";
import ChatBar from "./ChatBar";
import { SocketContextProvider } from "./SocketContextProvider";
import { MsgstoreProvider } from "./MsgstoreProvider";
import NoChatSelected from "./NoChatSelected";

export default function Home() {
  let [user_selected, setSelected] = useState(null);
  return (
    <SocketContextProvider>
      <MsgstoreProvider>
        <div className="flex h-screen">
          <ChatBar user_selector={setSelected} />
          {user_selected ? (
            <Chat user_selected={user_selected} />
          ) : (
            <NoChatSelected />
          )}
        </div>
      </MsgstoreProvider>
    </SocketContextProvider>
  );
}
