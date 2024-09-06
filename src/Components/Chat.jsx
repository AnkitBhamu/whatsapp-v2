import React, { useEffect, useState } from "react";
import "../styles/chat.css";
import { IoCallOutline } from "react-icons/io5";
import { VscSearch } from "react-icons/vsc";
import videocall from "../assets/video_call.png";
import { IoCheckmarkOutline } from "react-icons/io5";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { GrEmoji } from "react-icons/gr";
import { CgAttachment } from "react-icons/cg";
import { LuSendHorizonal } from "react-icons/lu";
import empty_image from "../assets/empty_image.svg";
import { convert_to_date, convert_to_time } from "../utils/time_convert";

export default function Chat(props) {
  let [chats_sorted, setsortedchats] = useState(null);
  let [chat_person, setperson] = useState(null);

  function render_chats(chats) {
    if (!chats) return null;
    else {
      let final_array = [];

      chats.forEach((value, key) => {
        final_array.push(
          <div className="flex justify-center" key={key}>
            <div className=" bg-white text-black px-2 py-1 rounded-sm flex">
              {key}
            </div>
          </div>
        );

        value.forEach((item, index) => {
          final_array.push(
            item.sender === "1234567890" ? (
              <div className="flex" key={key + index}>
                <div className="my-chat flex bg-my-chat-0 max-w-[50%] py-1 px-2 flex-col  rounded-md">
                  <div className="msg">{item.msg}</div>
                  <div className="time_status items-center flex gap-2 justify-end text-[grey] text-xs">
                    <div>{convert_to_time(item.msgtime)}</div>
                    {/* <IoCheckmarkOutline className="text-[grey]" /> */}
                    <IoCheckmarkDoneOutline className="text-[blue]" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-end" key={key + index}>
                <div className="my-chat flex bg-frnd-chat-0 max-w-[50%] py-2 px-2 flex-col items-end  rounded-md">
                  <div className="msg">{item.msg}</div>
                  <div className="time_status items-center flex gap-2 justify-end text-[grey] text-xs">
                    <div>{convert_to_time(item.msgtime)}</div>
                    {/* <IoCheckmarkOutline className="text-[grey]" /> */}
                    <IoCheckmarkDoneOutline className="text-[blue]" />
                  </div>
                </div>
              </div>
            )
          );
        });
      });
      return final_array;
    }
  }

  function sort_chats(chats) {
    let cmap = new Map();
    console.log("this function called!!");

    if (chats.length === 0) {
      setsortedchats(null);
    }

    for (let i = chats.length - 1; i >= 0; i--) {
      let element = chats[i];
      let date = convert_to_date(element.msgtime);
      if (cmap.get(date)) {
        cmap.get(date).push(element);
      } else {
        cmap.set(date, [element]);
      }
    }

    // chats.forEach((element) => {
    //   let date = convert_to_date(element.msgtime);
    //   if (cmap.get(date)) {
    //     cmap.get(date).push(element);
    //   } else {
    //     cmap.set(date, [element]);
    //   }
    // });

    console.log("cmap is : ", cmap);

    setsortedchats(cmap);
  }

  useEffect(() => {
    if (props.chat_data) {
      if (chat_person !== props.chat_data.user_details.mobile) {
        setperson(props.chat_data.user_details.mobile);
        sort_chats(props.chat_data.msgs);
      }
    }
  }, [props.chat_data]);

  return (
    <div className="chat-container grow  relative flex flex-col">
      {/* header section */}
      <div className="flex justify-between items-center bg-chat-bg-0 px-4 py-2">
        {/* left section */}
        <div className="flex flex-col">
          <div className="font-bold text-2xl">
            {props.chat_data && props.chat_data.user_details.name}
          </div>
          <div className="text-[grey]"> offline</div>
        </div>

        {/* right section */}
        <div className="flex gap-8 items-center">
          {/* <FcVideoCall className="header-icons" /> */}
          <img src={videocall} className="header-icons" alt="" />
          <IoCallOutline className="header-icons" />
          <div className="w-[2px] h-6 bg-gray-500"></div>
          <VscSearch className="header-icons" />
          <img
            src={props.chat_data && props.chat_data.user_details.profile_pic}
            onError={(event) => {
              event.target.src = empty_image;
            }}
            className="w-9 h-9 rounded-full"
            alt=""
          />
        </div>
      </div>

      {/* all chats */}
      <div className="chats pt-6 px-3 flex flex-col gap-y-8 grow overflow-hidden overflow-y-scroll pb-5">
        {render_chats(chats_sorted)}
      </div>
      {/* type chat */}
      <div className="h-12 relative flex items-center bg-white px-3 gap-4 shrink-0">
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
