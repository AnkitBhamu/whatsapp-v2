import React, { useState } from "react";
import Chat from "./Chat";
import ChatBar from "./ChatBar";
import { SocketContextProvider } from "./SocketContextProvider";
import { MsgstoreProvider } from "./MsgstoreProvider";
import NoChatSelected from "./NoChatSelected";
import VideoCall from "./VideoCall";

export default function Home() {
  let [user_selected, setSelected] = useState(null);
  let [videocall, setvideocall] = useState(false);
  let [call_details, setcall_details] = useState(null);
  return (
    <SocketContextProvider>
      <MsgstoreProvider>
        <div className="flex h-screen">
          {!videocall ? (
            <>
              <ChatBar
                user_selector={setSelected}
                user_selected={user_selected}
              />
              {user_selected ? (
                <Chat
                  user_selected={user_selected}
                  videocallsetter={setvideocall}
                  call_details_setter={setcall_details}
                />
              ) : (
                <NoChatSelected />
              )}
            </>
          ) : (
            <VideoCall
              call_details={call_details}
              videocallsetter={setvideocall}
            />
          )}
        </div>
      </MsgstoreProvider>
    </SocketContextProvider>
  );
}
