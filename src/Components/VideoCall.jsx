import React, { useEffect, useRef, useState } from "react";
import CallEndIcon from "@mui/icons-material/CallEnd";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import { useContext } from "react";
import empty_image from "../assets/empty_image.svg";
import { sockcontext } from "./SocketContextProvider";
import { Mic } from "@mui/icons-material";
export default function VideoCall({
  call_details,
  videocallsetter,
  call_type,
  video_offer,
}) {
  let [friend_video, setfriend_video] = useState(false);
  let [my_video, setmy_video] = useState(false);
  let [micclicked, setmicclicked] = useState(false);
  let [videoclicked, setvideoclicked] = useState(false);
  let [speakerclicked, setspeakerclicked] = useState(false);

  let rtc_ref = useRef(null);
  let media_ref = useRef(null);
  let socket = useContext(sockcontext);

  function audio_controller(action) {
    if (action === "mute")
      rtc_ref.current.getSenders()[0].track.enabled = false;

    if (action === "unmute") {
      rtc_ref.current.getSenders()[0].track.enabled = true;
    }
  }

  function video_controller(action) {
    console.log("Senders lists : ", rtc_ref.current.getSenders(), action);
    if (action === "video-off")
      rtc_ref.current.getSenders()[1].track.enabled = false;

    if (action === "video-on") {
      rtc_ref.current.getSenders()[1].track.enabled = true;
    }
  }

  async function get_userMedia() {
    try {
      let media_stream = await navigator.mediaDevices.getUserMedia({
        video: "true",
        audio: "true",
      });

      let element = document.querySelector(".my_video");
      element.srcObject = media_stream;
      element.onloadedmetadata = () => {
        element.play();
      };
      media_ref.current = media_stream;
      setmy_video(true);
      return media_stream;
    } catch (err) {
      return null;
    }
  }

  async function setup_call() {
    let media_stream = await get_userMedia();
    let icecands = [];

    console.log("Media stream that we get : ", media_stream.getVideoTracks());

    let rtcpeerconnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });

    rtc_ref.current = rtcpeerconnection;

    // rtcpeerconnection.ontrack listener
    rtcpeerconnection.ontrack = (event) => {
      console.log("a new track is added : ", event);
      let element = document.querySelector(".friend_video");
      console.log("media stream is : ", event.streams);
      element.srcObject = event.streams[0];
      element.onloadedmetadata = (event) => {
        element.play();
      };
      setfriend_video(true);
    };

    // if connection is closed then close the call from this side also:
    rtcpeerconnection.onconnectionstatechange = (event) => {
      console.log("Connection state is : ", rtcpeerconnection.connectionState);
      switch (rtcpeerconnection.connectionState) {
        case "failed": {
          videocallsetter(false);
        }
      }
    };

    //   initialised the rtc object  now  adding the tracks to it
    rtcpeerconnection.addTrack(media_stream.getAudioTracks()[0], media_stream);

    rtcpeerconnection.addTrack(media_stream.getVideoTracks()[0], media_stream);

    let offer = await rtcpeerconnection.createOffer();
    console.log("offer created ; ", offer);

    // set the local description
    await rtcpeerconnection.setLocalDescription(offer);

    // now this will be searcching for icecandidates
    rtcpeerconnection.onicecandidate = (event) => {
      console.log("Ice candidate is : ", event.candidate);
      if (event.candidate) {
        icecands.push(event.candidate);
        socket.emit("ice-candidate", {
          caller: call_details.initiator,
          receiver: call_details.target_user_details.mobile,
          type: "ice-candidate",
          candidate: event.candidate,
        });
      }
    };

    // sending video_call_msg to the server
    socket.emit("video-offer", {
      caller: call_details.initiator,
      receiver: call_details.target_user_details.mobile,
      type: "video-offer",
      offer: offer,
    });

    // rtcpeerconnection.ontrack method

    // now listening for the answer
    socket.on("video-answer", async (answer) => {
      icecands.forEach((item) =>
        socket.emit("ice-candidate", {
          caller: call_details.initiator,
          receiver: call_details.target_user_details.mobile,
          type: "ice-candidate",
          candidate: item,
        })
      );
      console.log("Video_answer came : ", answer);

      await rtcpeerconnection.setRemoteDescription(answer.answer);
    });

    socket.on("ice-candidate", async (candidate) => {
      await rtcpeerconnection.addIceCandidate(candidate.candidate);
      console.log("Ice candidate added");
    });
  }

  async function setup_answer(video_offer) {
    let media_stream = await get_userMedia();

    console.log("Media stream that we get : ", media_stream);

    let rtcpeerconnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });

    rtc_ref.current = rtcpeerconnection;

    // if connection is closed then close the call from this side also:
    rtcpeerconnection.onconnectionstatechange = (event) => {
      console.log("Connection state is : ", rtcpeerconnection.connectionState);
      switch (rtcpeerconnection.connectionState) {
        case "failed": {
          videocallsetter(false);
        }
      }
    };

    // rtcpeerconnection.ontrack method
    rtcpeerconnection.ontrack = (event) => {
      console.log("a new track is added : ", event);
      let element = document.querySelector(".friend_video");
      console.log("media stream is : ", event.streams);
      element.srcObject = event.streams[0];
      element.onloadedmetadata = (event) => {
        element.play();
      };
      setfriend_video(true);
    };

    await rtcpeerconnection.setRemoteDescription(video_offer.offer);
    console.log("Remote description added !!");

    //   initialised the rtc object  now  adding the tracks to it
    rtcpeerconnection.addTrack(media_stream.getAudioTracks()[0], media_stream);

    rtcpeerconnection.addTrack(media_stream.getVideoTracks()[0], media_stream);
    let answer = await rtcpeerconnection.createAnswer();
    console.log("Answer created ; ", answer);

    // set the local description
    await rtcpeerconnection.setLocalDescription(answer);

    // now this will be searcching for icecandidates
    rtcpeerconnection.onicecandidate = (event) => {
      console.log("Ice candidate is : ", event.candidate);
      if (event.candidate) {
        socket.emit("ice-candidate", {
          caller: video_offer.receiver,
          receiver: video_offer.caller,
          type: "ice-candidate",
          candidate: event.candidate,
        });
      }
    };

    // sending video_call_msg to the server
    socket.emit("video-answer", {
      caller: video_offer.caller,
      receiver: video_offer.receiver,
      type: "video-answer",
      answer: answer,
    });

    // sending video_call_msg to the server
    socket.on("ice-candidate", async (candidate) => {
      await rtcpeerconnection.addIceCandidate(candidate.candidate);
      console.log("Ice candidate added");
    });
  }

  useEffect(() => {
    switch (call_type) {
      case "call": {
        setup_call();
        break;
      }

      case "answer": {
        setup_answer(video_offer);
        break;
      }
    }

    // cleaning up  when unmounted
    return () => {
      console.log("removing prev stream and rtcconnection...");
      rtc_ref.current.close();
      rtc_ref.current = null;
      socket.off("ice-candidate");
      socket.off("video-answer");
      media_ref.current.getTracks().forEach((item) => item.stop());
    };
  }, []);

  return (
    <div className="bg-black/80 h-screen w-screen flex flex-col  justify-center items-center">
      <div
        className={`grow flex justify-center items-center ${
          !friend_video ? "flex" : "hidden"
        }`}
      >
        <img src={empty_image} className="w-36 h-36 rounded-full" alt="" />
      </div>

      <div className={`grow ${friend_video ? "flex" : "hidden"}`}>
        <video
          className="friend_video w-full h-full object-cover"
          src=""
        ></video>
      </div>

      <div
        className={`fixed top-3 right-3 border-2 border-white  rounded-md ${
          my_video ? "block" : "hidden"
        }`}
      >
        <video className="my_video w-48" src=""></video>
      </div>

      <div className="m-8 p-4 bg-black rounded-xl flex gap-6">
        <div
          className={`w-12 h-12 bg-[#393a3c] rounded-full flex items-center justify-center ${
            videoclicked ? "bg-blue-400" : ""
          }`}
          onClick={() => {
            if (!videoclicked) {
              video_controller("video-off");
            } else {
              video_controller("video-on");
            }
            setvideoclicked(!videoclicked);
          }}
        >
          {videoclicked ? (
            <VideocamOffIcon className="text-white w-8 h-8" />
          ) : (
            <VideocamIcon className="text-white w-8 h-8" />
          )}
        </div>
        <div
          className={` w-12 h-12 bg-[#393a3c] rounded-full flex items-center justify-center ${
            speakerclicked ? "bg-blue-400" : ""
          }`}
          onClick={() => setspeakerclicked(!speakerclicked)}
        >
          <VolumeUpIcon className="text-white w-8 h-8" />
        </div>
        <div
          className={` w-12 h-12 bg-[#393a3c] rounded-full flex items-center justify-center ${
            micclicked ? "bg-blue-400" : ""
          } `}
          onClick={() => {
            if (!micclicked) {
              audio_controller("mute");
            } else {
              audio_controller("unmute");
            }
            setmicclicked(!micclicked);
          }}
        >
          {micclicked ? (
            <MicOffIcon className="text-white w-8 h-8" />
          ) : (
            <Mic className="text-white w-8 h-8" />
          )}
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
