import React from "react";
import "../styles/chat.css";
import profile from "../assets/profile.jpg";
import { FcVideoCall } from "react-icons/fc";
import { IoCallOutline } from "react-icons/io5";
import { VscSearch } from "react-icons/vsc";
import bg_image from "../assets/chat-bg.png";
import videocall from "../assets/video_call.png";
import { IoCheckmarkOutline } from "react-icons/io5";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { GrEmoji } from "react-icons/gr";
import { CgAttachment } from "react-icons/cg";
import { LuSendHorizonal } from "react-icons/lu";

export default function Chat() {
  return (
    <div className="chat-container bg-chat-bg-0 grow pt-2 relative flex flex-col">
      {/* <img
        src={bg_image}
        alt=""
        className="h-full w-full object-cover absolute top-0 left-0 opacity-30"
      /> */}
      {/* header section */}
      <div className="flex justify-between items-center bg-[#faf6f3] px-4">
        {/* left section */}
        <div className="flex flex-col">
          <div className="font-bold text-2xl">Alice Walkman</div>
          <div className="text-[grey]"> offline</div>
        </div>

        {/* right section */}
        <div className="flex gap-8 items-center">
          {/* <FcVideoCall className="header-icons" /> */}
          <img src={videocall} className="header-icons" alt="" />
          <IoCallOutline className="header-icons" />
          <div className="w-[2px] h-6 bg-gray-500"></div>
          <VscSearch className="header-icons" />
          <img src={profile} className="w-8 h-8 rounded-full" alt="" />
        </div>
      </div>

      {/* all chats */}
      <div className="chats pt-6 px-3 flex flex-col gap-y-8 grow overflow-hidden overflow-y-scroll pb-5">
        {/* my chat */}
        <div className="my-chat flex bg-my-chat-0 max-w-[40%] py-2 px-2 flex-col drop-shadow-my-msg rounded-md">
          <div className="msg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
            accusamus molestias? Vero et quasi, quia inventore sit nemo velit
            omnis eius blanditiis doloribus officiis recusandae quod est, vel
            mollitia facere.
          </div>
          <div className="time_status items-center flex gap-2 justify-end text-[grey]">
            <div>6:01PM</div>
            {/* <IoCheckmarkOutline className="text-[grey]" /> */}
            <IoCheckmarkDoneOutline className="text-[blue]" />
          </div>
        </div>

        {/* friend chat */}
        <div className="flex justify-end">
          <div className="my-chat flex bg-frnd-chat-0 max-w-[50%] py-2 px-2 flex-col items-end drop-shadow-my-msg rounded-md">
            <div className="msg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
              accusamus molestias? Vero et quasi, quia inventore sit nemo velit
              omnis eius blanditiis doloribus officiis recusandae quod est, vel
              mollitia facere.
            </div>
            <div className="time_status items-center flex gap-2 justify-end text-[grey]">
              <div>6:01PM</div>
              {/* <IoCheckmarkOutline className="text-[grey]" /> */}
              <IoCheckmarkDoneOutline className="text-[blue]" />
            </div>
          </div>
        </div>
      </div>
      {/* type chat */}
      <div className="h-12 relative flex items-center bg-white px-3 gap-4">
        <GrEmoji className="w-6 h-6" />
        <CgAttachment className="w-5 h-5" />
        <input
          type="text"
          className="grow h-full outline-none"
          placeholder="Type a message"
        />
        <LuSendHorizonal className="w-6 h-6" />
      </div>
    </div>
  );
}
