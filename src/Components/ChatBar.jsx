import React, { useContext, useMemo, useState } from "react";
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
import AccountEdit from "./AccountEdit";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import FadeLoader from "react-spinners/FadeLoader";

export default function ChatBar({ user_selector, user_selected }) {
  let store_data = useContext(msgcontext);
  let [settings_selected, setsettings] = useState(false);
  let search_debouncer = useMemo(() => {
    let debouncer = function dbc(delay) {
      let timeout;
      return function (exec) {
        clearTimeout(timeout);
        timeout = setTimeout(exec, delay);
      };
    };
    return debouncer(500);
  }, []);

  console.log("re rendered chat bar!!");

  function longestMatch(str1, str2) {
    let arr1 = str1.toLowerCase().split("");
    let arr2 = str2.toLowerCase().split("");
    let count = 0;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] === arr2[i]) {
        count += 1;
      } else {
        break;
      }
    }

    return count;
  }

  function search(input) {
    if (input === "")
      return store_data.setcontacts((prev) => {
        console.log("came here");
        let new_arr = [...prev];
        new_arr.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
        });
        return new_arr;
      });
    let matched_arr = [];
    store_data.contacts.forEach((item, index) => {
      matched_arr.push({
        id: index,
        count: longestMatch(input, item.name),
      });
    });

    matched_arr.sort((a, b) => {
      return b.count - a.count;
    });

    // deep copy of the contacts array
    let new_contacts = [];
    matched_arr.forEach((element) => {
      let index = element.id;
      new_contacts.push(store_data.contacts[index]);
    });
    store_data.setcontacts(new_contacts);
  }

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
    <div className="pt-4  w-[400px]  h-screen flex flex-col">
      {/* chatbar heading */}
      <div className="flex justify-between items-center px-5">
        <div className="font-bold text-[24px] text-black">Chats</div>
        <div className="right flex gap-7 items-center">
          <BsPlus className="h-7 w-7" />
          <div className="relative">
            <TbSettings
              className="h-5 w-5"
              onClick={() => setsettings(!settings_selected)}
            />
            {settings_selected ? <AccountEdit /> : null}
          </div>
        </div>
      </div>

      {/*  chat search */}
      <div className="search-bar h-10 mt-5 relative shrink-0 mx-5">
        <input
          type="text"
          placeholder="Search or start new chat"
          className="h-full w-full border-2 border-[#dadada] px-2 text-[black]"
          onChange={(event) =>
            search_debouncer(() => {
              search(event.target.value);
            })
          }
        />
        <VscSearch className="absolute right-3 top-[50%] translate-y-[-50%] w-4 h-4" />
      </div>

      {/* chats section */}
      <div className="px-3 chatbar chat-section mt-6 w-full flex flex-col pb-3 gap-y-1 grow overflow-hidden overflow-y-scroll">
        {store_data.contacts.length > 0 ? (
          store_data.contacts.map((item, index) => (
            <div
              className={`chat flex gap-3 cursor-pointer  text-white py-3 px-3
                ${
                  user_selected &&
                  user_selected.user_details.mobile === item.mobile
                    ? "bg-black/15"
                    : "hover:bg-black/10"
                }`}
              key={index}
              onClick={() => {
                if (store_data.chats.get(item.mobile)) {
                  user_selector((prev) => {
                    if (prev) {
                      if (prev.user_details.mobile !== item.mobile) {
                        return {
                          user_details: item,
                        };
                      } else {
                        return prev;
                      }
                    } else {
                      return {
                        user_details: item,
                      };
                    }
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
                <div className="flex gap-1 items-center">
                  {/* msg read */}
                  {store_data.chats.get(item.mobile) &&
                  store_data.chats.get(item.mobile).chats.length > 0 &&
                  store_data.chats.get(item.mobile).chats[0].sender ===
                    JSON.parse(localStorage.getItem("mobile")) &&
                  store_data.chats.get(item.mobile).chats[0].msgread ? (
                    <IoCheckmarkDoneOutline className="text-[blue] w-4 h-4" />
                  ) : null}

                  {/* msg unread */}
                  {store_data.chats.get(item.mobile) &&
                  store_data.chats.get(item.mobile).chats.length > 0 &&
                  store_data.chats.get(item.mobile).chats[0].sender ===
                    JSON.parse(localStorage.getItem("mobile")) &&
                  !store_data.chats.get(item.mobile).chats[0].msgread ? (
                    <IoCheckmarkDoneOutline className="text-[grey] w-4 h-4" />
                  ) : null}

                  <div className="line-clamp-1 text-chat-bar-msg-0">
                    {store_data.chats.get(item.mobile) &&
                    store_data.chats.get(item.mobile).chats.length > 0
                      ? render_msg_content(
                          store_data.chats.get(item.mobile).chats[0]
                        )
                      : "Start a new chat"}
                  </div>
                </div>
              </div>

              {/* right section */}
              <div className="flex flex-col gap-y-1 shrink-0">
                <div className="text-chat-pending-0 text-sm font-medium">
                  {store_data.chats.get(item.mobile) &&
                  store_data.chats.get(item.mobile).chats.length > 0
                    ? beautify_date(
                        store_data.chats.get(item.mobile).chats[0].msgtime
                      )
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
          ))
        ) : (
          <div className="grow flex justify-center items-center">
            <FadeLoader />
          </div>
        )}
      </div>
    </div>
  );
}
