import React, { useContext, useEffect, useRef, useState } from "react";
import "../styles/chat.css";
import { IoCallOutline } from "react-icons/io5";
import { VscSearch } from "react-icons/vsc";
import videocall from "../assets/video_call.png";
import { GrEmoji } from "react-icons/gr";
import { CgAttachment } from "react-icons/cg";
import { LuSendHorizonal } from "react-icons/lu";
import empty_image from "../assets/empty_image.svg";
import { convert_to_date } from "../utils/time_convert";
import { sockcontext } from "./SocketContextProvider";
import EmojiPicker from "emoji-picker-react";
import { msgcontext } from "./MsgstoreProvider";
import AttachmentOptions from "./AttachmentOptions";
import debouncer from "../utils/debouncer";
import longestMatch from "../utils/searching";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import Rendered_chats from "./Chats";

export default function Chat({
  user_selected,
  videocallsetter,
  call_details_setter,
  call_type_setter,
  setcallmedia,
}) {
  console.log("Chat rendered!!");
  let [chats_sorted, setsortedchats] = useState(null);
  let chat_ref = useRef();
  let chat_container_ref = useRef();
  let socket = useContext(sockcontext);
  let store_data = useContext(msgcontext);
  let [user_stats, setstatus] = useState("offline");
  let chat_input_ref = useRef();
  let [openemoji, setemoji] = useState(false);
  let [sentmsg, setmsg] = useState("");
  let [attachclicked, setattached] = useState(false);
  let [searched_clicked, setsrchclicked] = useState(false);
  let [matched_chats, setmatched] = useState([]);
  let [current_match_index, setindex] = useState(0);

  function search_chat(input) {
    if (matched_chats.length != 0) {
      let element = document.getElementById(
        matched_chats[current_match_index - 1].id
      );
      element.style.backgroundColor = "";
    }
    if (input === "") {
      setindex(0);
      setmatched([]);
      return;
      // do the scroll to bottom of the container
    }

    let matched_arr = [];
    chats_sorted.forEach((value, key) => {
      value.forEach((item, index) => {
        let mcount = longestMatch(input, item.msg);
        if (mcount > 0) {
          matched_arr.push({
            id: key + index,
            count: mcount,
          });
        }
      });
    });

    if (matched_arr.length === 0) {
      setindex(0);
      setmatched([]);
      return;
    }

    setmatched(matched_arr);
    setindex(1);
    let first_element = document.getElementById(matched_arr[0].id);
    first_element.scrollIntoView({ block: "center" });
    first_element.style.backgroundColor = "#eeee01";
  }

  function change_matched_index(action) {
    if (action == "down") {
      let curr_index = Math.min(current_match_index + 1, matched_chats.length);
      let prev_index = current_match_index;
      let prev_element = document.getElementById(
        matched_chats[prev_index - 1].id
      );
      let curr_element = document.getElementById(
        matched_chats[curr_index - 1].id
      );
      curr_element.scrollIntoView({ block: "center" });
      curr_element.style.backgroundColor = "#eeee01";
      prev_element.style.backgroundColor = "";
      // curr_element.style.scale = "1.5";
      // prev_element.style.scale = "1";
      setindex(curr_index);
    }

    if (action == "up") {
      let curr_index = Math.max(current_match_index - 1, 1);
      let prev_index = current_match_index;
      let prev_element = document.getElementById(
        matched_chats[prev_index - 1].id
      );
      let curr_element = document.getElementById(
        matched_chats[curr_index - 1].id
      );
      curr_element.scrollIntoView({ block: "center" });
      curr_element.style.backgroundColor = "#eeee01";
      prev_element.style.backgroundColor = "";
      // curr_element.style.scale = "1.5";
      // prev_element.style.scale = "1";
      setindex(curr_index);
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

    // console.log("sorted array is : ", cmap);
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
        sender: JSON.parse(localStorage.getItem("mobile")),
        receiver: user_selected.user_details.mobile,
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
        receiver: user_selected.user_details.mobile,
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
  }, [user_selected.user_details.mobile]);

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
    let timer;
    timer = setInterval(() => {
      get_user_status(user_selected.user_details.mobile);
    }, 5000);

    return () => {
      clearInterval(timer);
      console.log("Timer interval deleted");
    };
  }, [user_selected.user_details.mobile]);

  useEffect(() => {
    setsrchclicked(false);
    setmatched([]);
    setindex(0);
    setemoji(false);
    setattached(false);
    get_user_status(user_selected.user_details.mobile);
    store_data.setchats((prev) => {
      let new_map = new Map(prev);
      prev.get(user_selected.user_details.mobile).unread = 0;
      return new_map;
    });
  }, [user_selected.user_details.mobile]);

  // updating the chats
  useEffect(() => {
    // notifying the users that all messages readed they sent
    socket.emit("all_msg_read", user_selected.user_details.mobile);
    setsortedchats(
      sort_chats(store_data.chats.get(user_selected.user_details.mobile).chats)
    );
  }, [store_data.chats]);

  // reset the scroll always to bottom of the chats
  useEffect(() => {
    if (chat_ref.current) {
      setTimeout(() => {
        let height = chat_ref.current.scrollHeight;
        chat_container_ref.current.scrollTo(
          0,
          Math.max(height, window.innerHeight)
        );
      }, 100);
    }
  }, [chats_sorted]);

  return (
    <div className="chat-container grow  relative flex flex-col">
      {/* header section */}
      <div className="flex justify-between items-center bg-chat-bg-0 px-4 py-2 relative">
        {/* left section */}
        <div className="flex flex-col">
          <div className="font-bold text-2xl">
            {user_selected.user_details.name}
          </div>
          <div className="text-[grey]">{user_stats}</div>
        </div>

        {/* right section */}
        <div className="flex gap-8 items-center">
          {/* <FcVideoCall className="header-icons" /> */}
          <img
            src={videocall}
            className="header-icons"
            alt=""
            onClick={() => {
              videocallsetter(true);
              call_type_setter("call");
              setcallmedia("video");
              call_details_setter({
                initiator: JSON.parse(localStorage.getItem("mobile")),
                target_user_details: user_selected.user_details,
              });
            }}
          />
          <IoCallOutline
            className="header-icons"
            onClick={() => {
              videocallsetter(true);
              call_type_setter("call");
              call_details_setter({
                initiator: JSON.parse(localStorage.getItem("mobile")),
                target_user_details: user_selected.user_details,
              });
            }}
          />
          <div className="w-[2px] h-6 bg-gray-500"></div>
          <div className=" p-2">
            <VscSearch
              className="header-icons"
              onClick={() => {
                if (searched_clicked) {
                  matched_chats.length > 0 &&
                    (document.getElementById(
                      matched_chats[current_match_index - 1].id
                    ).style.backgroundColor = "");
                  setmatched([]);
                  setindex(0);
                }

                setsrchclicked(!searched_clicked);
              }}
            />
          </div>

          <img
            src={user_selected.user_details.profile_pic}
            onError={(event) => {
              event.target.src = empty_image;
            }}
            className="w-9 h-9 rounded-full"
            alt=""
          />
        </div>
        <div
          className={`search-box absolute bg-red z-50  border-t-2 border-black/10 flex gap-2  bg-white  right-4 top-full h-14 drop-shadow-lg p-2 min-w-80 max-w-[800px] ${
            searched_clicked ? "block" : "hidden"
          }`}
        >
          <div className="flex grow items-center">
            <input
              type="text"
              placeholder="search a chat"
              className="h-full grow p-2  text-black outline-none"
              onChange={(event) =>
                debouncer(() => {
                  search_chat(event.target.value);
                })
              }
            />
            <div className="text-black/50">
              {current_match_index} of {matched_chats.length}
            </div>
          </div>

          <button onClick={() => change_matched_index("up")}>
            <KeyboardArrowUp />
          </button>
          <button onClick={() => change_matched_index("down")}>
            <KeyboardArrowDown />
          </button>
        </div>
      </div>

      {/* all chats */}
      <div
        ref={chat_container_ref}
        className="chats pt-6 px-8 flex flex-col gap-y-8 grow overflow-y-scroll pb-5 scroll-smooth"
      >
        <Rendered_chats chats={chats_sorted} chat_ref={chat_ref} />
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
