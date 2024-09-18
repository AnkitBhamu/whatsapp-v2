import React, { memo } from "react";
import "../styles/chat.css";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { convert_to_time } from "../utils/time_convert";
import Msg from "./Msg";

let Rendered_chats = memo(function render_chats({ chats, chat_ref }) {
  if (!chats || chats.length === 0) return <div ref={chat_ref}></div>;
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
          item.sender !== JSON.parse(window.localStorage.getItem("mobile")) ? (
            <div className="flex" key={key + index}>
              <div
                id={key + index}
                className="my-chat flex bg-my-chat-0 max-w-[50%] py-1 px-2 flex-col gap-y-1 rounded-md"
              >
                <Msg msg={item} />
                <div className="time_status items-center flex gap-2 justify-end text-[grey] text-xs">
                  <div>{convert_to_time(item.msgtime)}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-end" key={key + index}>
              <div
                id={key + index}
                className="my-chat flex bg-frnd-chat-0 max-w-[50%] py-2 px-2 flex-col gap-y-1 items-end  rounded-md"
              >
                <Msg msg={item} />
                <div className="time_status items-center flex gap-2 justify-end text-[grey] text-xs">
                  <div>{convert_to_time(item.msgtime)}</div>
                  {item.msgread ? (
                    <IoCheckmarkDoneOutline className="text-[blue] w-4 h-4" />
                  ) : (
                    <IoCheckmarkDoneOutline className="text-[grey] w-4 h-4" />
                  )}
                </div>
              </div>
            </div>
          )
        );
      });
    });

    return (
      <div className="flex flex-col gap-y-8" ref={chat_ref}>
        {final_array}
      </div>
    );
  }
});

export default Rendered_chats;
