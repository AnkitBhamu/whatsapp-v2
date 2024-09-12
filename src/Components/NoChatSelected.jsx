import React from "react";
import "../styles/chat.css";
import logo from "../assets/logo-green.svg";

export default function NoChatSelected() {
  return (
    <div className="grow no-chat h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-y-4">
        <img src={logo} className="w-24 h-24" alt="" />
        <div className="text-lg">WhatsApp for Desktop</div>
      </div>
    </div>
  );
}
