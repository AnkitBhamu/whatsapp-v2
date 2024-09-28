import React, { useContext, useEffect, useState } from "react";
import CallIcon from "@mui/icons-material/Call";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { sockcontext } from "./SocketContextProvider";
import { msgcontext } from "./MsgstoreProvider";

export default function ({ setvideocall, setcalltype, setvideo_offer }) {
  let socket = useContext(sockcontext);
  let [visible, setvisible] = useState(false);
  let [offer, setoffer] = useState(null);
  console.log("Call popup is rendered", offer, visible);

  useEffect(() => {
    socket.on("video-offer", (offer) => {
      setoffer(offer);
      setvisible(true);
    });
  });
  return (
    <>
      {visible ? (
        <div className="fixed z-50 bg-[#544c4cf7] p-6  text-white right-4 bottom-4 rounded-md flex items-center w-80">
          <div className="font-semibold">
            ANKIT KUMAR
            <div>Videocall</div>
          </div>
          <div className="flex gap-3 grow justify-end">
            <div
              className="bg-red-500 w-12 h-12 rounded-full flex items-center justify-center"
              onClick={() => {
                setvisible(false);
              }}
            >
              <CallEndIcon className="w-8 h-8" />
            </div>
            <div
              className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center"
              onClick={() => {
                setvisible(false);
                setvideocall(true);
                setcalltype("answer");
                setvideo_offer(offer);
              }}
            >
              <CallIcon className="w-8 h-8" />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
