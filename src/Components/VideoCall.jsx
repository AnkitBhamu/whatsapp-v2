import React, { useEffect } from "react";
import CallEndIcon from "@mui/icons-material/CallEnd";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
export default function VideoCall({ call_details, videocallsetter }) {
  console.log("Call details are : ", call_details);

  async function get_userMedia() {
    try {
      let media_stream = await navigator.mediaDevices.getUserMedia({
        video: "true",
        audio: "true",
      });
      return media_stream;
    } catch (err) {
      return null;
    }
  }

  async function setup_call() {
    let media_stream = await get_userMedia();

    console.log("Media stream that we get : ", media_stream);

    let rtcpeerconnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });

    //   initialised the rtc object  now  adding the tracks to it
    rtcpeerconnection.addTrack(media_stream.getVideoTracks()[0], media_stream);
    rtcpeerconnection.addTrack(media_stream.getAudioTracks()[0], media_stream);

    let offer = await rtcpeerconnection.createOffer();
    console.log("offer created ; ", offer);

    // set the local description
    rtcpeerconnection.setLocalDescription(offer);

    // now this will be searcching for icecandidates
    rtcpeerconnection.onicecandidate = (event) => {
      console.log("Ice candidate is : ", event.candidate);
    };

    // rtcpeerconnection.ontrak
  }

  useEffect(() => {
    setup_call();
  });

  return (
    <div className="bg-black/80 h-screen w-screen flex flex-col  justify-center items-center">
      <div className="grow flex justify-center items-center">
        <img
          src={call_details.target_user_details.profile_pic}
          className="w-36 h-36 rounded-full"
          alt=""
        />
      </div>

      <div className="m-8 p-4 bg-black rounded-xl flex gap-6">
        <div className=" w-12 h-12 bg-[#393a3c] rounded-full flex items-center justify-center">
          <VideocamIcon className="text-white w-8 h-8" />
        </div>
        <div className=" w-12 h-12 bg-[#393a3c] rounded-full flex items-center justify-center">
          <VolumeUpIcon className="text-white w-8 h-8" />
        </div>
        <div className=" w-12 h-12 bg-[#393a3c] rounded-full flex items-center justify-center">
          <MicOffIcon className="text-white w-8 h-8" />
        </div>

        <div
          className="bg-red-700 rounded-full w-12 h-12 flex items-center justify-center"
          onClick={() => {
            videocallsetter(false);
          }}
        >
          <CallEndIcon className="text-white w-8 h-8" />
        </div>
      </div>
    </div>
  );
}
