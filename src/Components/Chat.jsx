import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
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
import { sockcontext } from "./SocketContextProvider";

export default function Chat(props) {
  let [chats_sorted, setsortedchats] = useState(null);
  let [chat_person, setperson] = useState(null);
  let chat_ref = useRef();
  let chat_container_ref = useRef();
  let socket = useContext(sockcontext);
  let [user_stats, setstatus] = useState("offline");
  let chat_input_ref = useRef();

  // saving the expensive computation
  let rendered_chats = useMemo(
    () => render_chats(chats_sorted),
    [chats_sorted]
  );

  function render_chats(chats) {
    if (!chats || chats.length === 0) return null;
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
      return (
        <div className="flex flex-col gap-y-8" ref={chat_ref}>
          {final_array}
        </div>
      );
    }
  }

  function sort_chats(chats) {
    let cmap = new Map();

    if (chats.length === 0) {
      setsortedchats(null);
    }

    for (let i = chats.length - 1; i >= 0; i--) {
      let element = chats[i];
      let date = convert_to_date(element.msgtime);
      let date_now = convert_to_date(new Date());
      if (date_now === date) {
        date = "TODAY";
      }
      if (cmap.get(date)) {
        cmap.get(date).push(element);
      } else {
        cmap.set(date, [element]);
      }
    }

    return cmap;
  }

  // add to chats map on receiving a message
  function add_to_chats(msg) {
    setsortedchats((prev) => {
      let date = convert_to_date(msg.msgtime);
      let date_now = convert_to_date(new Date());
      if (date_now === date) {
        date = "TODAY";
      }
      if (prev.get(date)) {
        prev.get(date).push(msg);
        prev
          .get(date)
          .sort((a, b) => new Date(a.msgtime) - new Date(b.msgtime));
      } else {
        prev.set(date, [msg]);
        prev
          .get(date)
          .sort((a, b) => new Date(a.msgtime) - new Date(b.msgtime));
      }

      return new Map(prev);
    });
  }

  function sendMsg() {
    let msg_data = chat_input_ref.current.value;
    if (msg_data != "") {
      let msg = {
        sender: "1234567890",
        receiver: chat_person,
        msg: msg_data,
        msgtype: "text",
        msgtime: new Date().toISOString(),
      };

      socket.emit("msg", msg);
      add_to_chats(msg);
    }
  }

  // function get user_status every 5 ms
  function get_user_status(mobile) {
    console.log("this function is called!!");
    socket.emit("user_status", mobile);
  }

  // register event handler on socket that comes to us
  useEffect(() => {
    socket.on("msg", (msg) => {
      console.log("msg came and it is : ", msg);
      if (chat_person) {
        console.log("chat person is set");
        if (msg.sender === chat_person) {
          add_to_chats(msg);
        }
      }
    });

    socket.on("user_status", (status) => {
      console.log("user is : ", status);
      setstatus(status);
    });
  }, []);

  // user status check every 5 seconds
  useEffect(() => {
    if (chat_person) {
      get_user_status(chat_person);
    }
    let timer;
    if (chat_person) {
      timer = setInterval(() => {
        get_user_status(chat_person);
      }, 5000);

      return () => {
        clearInterval(timer);
        console.log("Timer interval deleted");
      };
    }
  }, [chat_person]);

  // these are async functions
  useEffect(() => {
    if (chat_person !== props.chat_data.user_details.mobile) {
      setperson(props.chat_data.user_details.mobile);
      setsortedchats(sort_chats(props.chat_data.msgs));
    }
  }, [props.chat_data]);

  // reset the scroll always to bottom of the chats
  useEffect(() => {
    if (chat_ref.current) {
      let height_chat_container =
        chat_ref.current.getBoundingClientRect().height;
      chat_container_ref.current.scrollTo(0, height_chat_container);
    }
  }, [props.chat_data, chat_ref, chat_person, chats_sorted]);

  return (
    <div className="chat-container grow  relative flex flex-col">
      {/* header section */}
      <div className="flex justify-between items-center bg-chat-bg-0 px-4 py-2">
        {/* left section */}
        <div className="flex flex-col">
          <div className="font-bold text-2xl">
            {props.chat_data.user_details.name}
          </div>
          <div className="text-[grey]">{user_stats}</div>
        </div>

        {/* right section */}
        <div className="flex gap-8 items-center">
          {/* <FcVideoCall className="header-icons" /> */}
          <img src={videocall} className="header-icons" alt="" />
          <IoCallOutline className="header-icons" />
          <div className="w-[2px] h-6 bg-gray-500"></div>
          <VscSearch className="header-icons" />
          <img
            src={props.chat_data.user_details.profile_pic}
            onError={(event) => {
              event.target.src = empty_image;
            }}
            className="w-9 h-9 rounded-full"
            alt=""
          />
        </div>
      </div>

      {/* all chats */}
      <div
        ref={chat_container_ref}
        className="chats pt-6 px-3 flex flex-col gap-y-8 grow overflow-hidden overflow-y-scroll pb-5 scroll-smooth"
      >
        {rendered_chats}
      </div>

      {/* type chat */}
      <div className="h-12 relative flex items-center bg-white px-3 gap-4 shrink-0">
        <GrEmoji className="w-6 h-6" />
        <CgAttachment className="w-5 h-5" />
        <input
          type="text"
          className="grow h-full outline-none"
          placeholder="Type a message"
          ref={chat_input_ref}
        />
        <LuSendHorizonal
          className="w-6 h-6"
          onClick={() => {
            sendMsg();
          }}
        />
      </div>
    </div>
  );
}
