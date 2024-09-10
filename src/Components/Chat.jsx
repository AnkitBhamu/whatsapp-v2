import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import "../styles/chat.css";
import { IoCallOutline } from "react-icons/io5";
import { VscSearch } from "react-icons/vsc";
import videocall from "../assets/video_call.png";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { GrEmoji } from "react-icons/gr";
import { CgAttachment } from "react-icons/cg";
import { LuSendHorizonal } from "react-icons/lu";
import empty_image from "../assets/empty_image.svg";
import { convert_to_date, convert_to_time } from "../utils/time_convert";
import { sockcontext } from "./SocketContextProvider";
import EmojiPicker from "emoji-picker-react";
import { msgcontext } from "./MsgstoreProvider";
import AttachmentOptions from "./AttachmentOptions";
import Msg from "./Msg";

export default function Chat(props) {
  let [chats_sorted, setsortedchats] = useState(null);
  let [chat_person, setperson] = useState(null);
  let chat_ref = useRef();
  let chat_container_ref = useRef();
  let socket = useContext(sockcontext);
  let store_data = useContext(msgcontext);
  let [user_stats, setstatus] = useState("offline");
  let chat_input_ref = useRef();
  let [openemoji, setemoji] = useState(false);
  let [sentmsg, setmsg] = useState("");
  let [attachclicked, setattached] = useState(false);

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
            item.sender !==
              JSON.parse(window.localStorage.getItem("mobile")) ? (
              <div className="flex" key={key + index}>
                <div className="my-chat flex bg-my-chat-0 max-w-[50%] py-1 px-2 flex-col gap-y-1 rounded-md">
                  <Msg msg={item} />
                  <div className="time_status items-center flex gap-2 justify-end text-[grey] text-xs">
                    <div>{convert_to_time(item.msgtime)}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-end" key={key + index}>
                <div className="my-chat flex bg-frnd-chat-0 max-w-[50%] py-2 px-2 flex-col gap-y-1 items-end  rounded-md">
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
  }

  function sort_chats(chats) {
    console.log("sorting the chats that are : ", store_data.chats);
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

    console.log("sorted array is : ", cmap);
    return cmap;
  }

  // add to chats map on receiving a message
  function add_to_chats(msg) {
    store_data.chats_updater(msg, msg.receiver);
  }

  function send_media_msg(msg_data, type) {
    let now = new Date();
    if (msg_data) {
      let msg = {
        sender: "1234567890",
        receiver: chat_person,
        msg: "",
        media_data: msg_data,
        msgtype: type.toLowerCase(),
        msgtime: now.toUTCString(),
        msgread: false,
        reached_server: false,
      };

      add_to_chats(msg);
      socket.emit("msg", msg);
      setmsg("");
    }
  }

  function sendMsg() {
    let msg_data = chat_input_ref.current.value;
    let now = new Date();
    if (msg_data != "") {
      let msg = {
        sender: JSON.parse(localStorage.getItem("mobile")),
        receiver: chat_person,
        msg: msg_data,
        msgtype: "text",
        msgtime: now,
        msgread: false,
        reached_server: false,
      };

      socket.emit("msg", msg);
      add_to_chats(msg);
      setmsg("");
    }
  }

  // clearing the chat on user_change
  useEffect(() => {
    setmsg("");
  }, [props.chat_data.user_details.mobile]);

  // function get user_status every 5 ms
  function get_user_status(mobile) {
    socket.emit("user_status", mobile);
  }

  // register event handler on socket that comes to us
  useEffect(() => {
    socket.on("user_status", (status) => {
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
    }
    setsortedchats(
      sort_chats(store_data.chats.get(props.chat_data.user_details.mobile))
    );

    // notifying the users that all messages readed they sent
    socket.emit("all_msg_read", props.chat_data.user_details.mobile);
    store_data.chats.get(props.chat_data.user_details.mobile).unread = 0;
  }, [props.chat_data.user_details.mobile, store_data.chats]);

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
        className="chats pt-6 px-8 flex flex-col gap-y-8 grow overflow-hidden overflow-y-scroll pb-5 scroll-smooth"
      >
        {rendered_chats}
      </div>

      {/* type chat */}
      <div className="h-12 relative flex items-center bg-white px-3 gap-4 shrink-0">
        <div className="absolute top-[-455px] left-3 ">
          <EmojiPicker
            open={openemoji}
            className="z-50"
            lazyLoadEmojis={true}
            onEmojiClick={(emoji) => {
              setmsg((prev) => prev + emoji.emoji);
            }}
          />
        </div>

        <GrEmoji
          className="w-6 h-6 relative cursor-pointer"
          onClick={() => setemoji(!openemoji)}
        />
        <CgAttachment
          className="w-5 h-5"
          onClick={() => setattached(!attachclicked)}
        />
        {attachclicked ? (
          <AttachmentOptions msg_sender={send_media_msg} active={setattached} />
        ) : null}

        <input
          type="text"
          className="grow h-full outline-none"
          placeholder="Type a message"
          ref={chat_input_ref}
          onChange={(event) => setmsg(event.target.value)}
          value={sentmsg}
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
