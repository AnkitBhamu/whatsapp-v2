import React, { useState } from "react";
import Chat from "./Chat";
import ChatBar from "./ChatBar";
import { SocketContextProvider } from "./SocketContextProvider";
import { MsgstoreProvider } from "./MsgstoreProvider";
import NoChatSelected from "./NoChatSelected";
import VideoCall from "./VideoCall";
import CallPopup from "./CallPopup";

export default function Home() {
  let [user_selected, setSelected] = useState(null);
  let [videocall, setvideocall] = useState(false);
  let [call_details, setcall_details] = useState(null);
  let [caller_details, set_caller_details] = useState(null);
  let [call_type, setcalltype] = useState("");
  let [video_offer, setvideo_offer] = useState(null);

  console.log("Home re rendered!!");

  return (
    <SocketContextProvider>
      <MsgstoreProvider>
        <CallPopup
          setvideocall={setvideocall}
          setcalltype={setcalltype}
          set_caller_details={set_caller_details}
          setvideo_offer={setvideo_offer}
        />
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
                  call_type_setter={setcalltype}
                />
              ) : (
                <NoChatSelected />
              )}
            </>
          ) : (
            <VideoCall
              call_details={call_details}
              videocallsetter={setvideocall}
              call_type={call_type}
              video_offer={video_offer}
            />
          )}
        </div>
      </MsgstoreProvider>
    </SocketContextProvider>
  );
}
