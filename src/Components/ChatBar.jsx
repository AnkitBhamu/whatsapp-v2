import React, { useContext } from "react";
import { TbSettings } from "react-icons/tb";
import { BsPlus } from "react-icons/bs";
import { VscSearch } from "react-icons/vsc";
import "../styles/chatbar.css";
import empty_image from "../assets/empty_image.svg";
import { beautify_date } from "../utils/time_convert";
import { msgcontext } from "./MsgstoreProvider";
import { CiImageOn } from "react-icons/ci";
import { TfiVideoClapper } from "react-icons/tfi";
import { IoDocumentOutline } from "react-icons/io5";

export default function ChatBar(props) {
  let store_data = useContext(msgcontext);
  console.log("re rendered!!");
  console.log(store_data.chats);

  function render_msg_content(msg) {
    switch (msg.msgtype.toLowerCase()) {
      case "text":
        return msg.msg;

      case "photo": {
        return (
          <div className="flex gap-2 items-center">
            <CiImageOn />
            Photo
          </div>
        );
      }
      case "document": {
        return (
          <div className="flex gap-2 items-center">
            <IoDocumentOutline />
            Document
          </div>
        );
      }

      case "video": {
        return (
          <div className="flex gap-2 items-center">
            <TfiVideoClapper />
            Video
          </div>
        );
      }
    }
  }

  return (
    <div className="pt-4  min-w-80 max-w-[400px]  h-screen flex flex-col">
      {/* chatbar heading */}
      <div className="flex justify-between items-center px-5">
        <div className="font-bold text-[24px] text-black">Chats</div>
        <div className="right flex gap-7 items-center">
          <BsPlus className="h-7 w-7" />
          <TbSettings className="h-5 w-5" />
        </div>
      </div>

      {/*  chat search */}
      <div className="search-bar h-10 mt-5 relative shrink-0 mx-5">
        <input
          type="text"
          placeholder="Search or start new chat"
          className="h-full w-full border-2 border-[#dadada] px-2 text-[#fefefe]"
        />
        <VscSearch className="absolute right-3 top-[50%] translate-y-[-50%] w-4 h-4" />
      </div>

      {/* chats section */}
      <div className="px-3 chatbar chat-section mt-6 w-full flex flex-col pb-3 grow overflow-hidden overflow-y-scroll">
        {store_data.contacts.map((item, index) => (
          <div
            className="chat flex gap-3 cursor-pointer hover:bg-black/10 text-white py-3 px-3"
            key={index}
            onClick={() => {
              if (store_data.chats.get(item.mobile)) {
                props.chat_selector({
                  user_details: item,
                });
              }
            }}
          >
            {/* left section */}
            <img
              src={item.profile_pic}
              loading="lazy"
              onError={(event) => {
                event.target.src = empty_image;
              }}
              className="w-12 h-12 rounded-full shrink-0"
            />
            {/* middle section */}
            <div className="flex flex-col gap-y-1 grow">
              <div className="font-bold text-[#0d0d0d]">{item.name}</div>
              <div className="line-clamp-1 text-chat-bar-msg-0">
                {store_data.chats.get(item.mobile) &&
                store_data.chats.get(item.mobile).length > 0
                  ? render_msg_content(store_data.chats.get(item.mobile)[0])
                  : "Start a new chat"}
              </div>
            </div>

            {/* right section */}
            <div className="flex flex-col gap-y-1 shrink-0">
              <div className="text-chat-pending-0 text-sm font-medium">
                {store_data.chats.get(item.mobile) &&
                store_data.chats.get(item.mobile).length > 0
                  ? beautify_date(store_data.chats.get(item.mobile)[0].msgtime)
                  : null}
              </div>
              {store_data.chats.get(item.mobile) &&
              store_data.chats.get(item.mobile).unread > 0 ? (
                <div className="flex items-center justify-end">
                  <div className="bg-[#3aa13abf] rounded-full w-6 h-6 text-white flex items-center justify-center">
                    {store_data.chats.get(item.mobile).unread}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
