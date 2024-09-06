import React, { useEffect, useState } from "react";
import { TbSettings } from "react-icons/tb";
import { BsPlus } from "react-icons/bs";
import { VscSearch } from "react-icons/vsc";
import "../styles/chatbar.css";
import axios from "axios";
import empty_image from "../assets/empty_image.svg";
import { beautify_date, convert_to_time } from "../utils/time_convert";

export default function ChatBar(props) {
  let [contacts, setcontacts] = useState([]);
  let [chats, setchats] = useState(new Map());

  // console.log("Chats are:", chats);

  async function fetch_chats(user1, user2) {
    axios
      .get(
        `http://localhost:8080/api/chats/fetch?user1=${user1}&user2=${user2}`
      )
      .then((response) => {
        setchats((prev_chats) => {
          let new_map = new Map(prev_chats);
          new_map.set(user2, response.data);

          return new_map;
        });
      });
  }

  // get all contacts
  async function get_chat_history(mobile) {
    let response = await axios.get(
      `http://localhost:8080/api/user/contacts?mobile=${mobile}`
    );

    response.data.contacts.forEach((element) => {
      axios
        .get(`http://localhost:8080/api/user/details?mobile=${element}`)
        .then(
          (response) => {
            setcontacts((contacts) => [...contacts, response.data]);
            fetch_chats("1234567890", response.data.mobile);
          }
          // using this form for avoiding closure issues as it takes old value as arguement and update it(basically chaining)
        )
        .catch((err) => console.log(err));
    });
  }

  useEffect(() => {
    get_chat_history("1234567890");
  }, []);

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
        {contacts.map((item, index) => (
          <div
            className="chat flex gap-3 cursor-pointer hover:bg-black/10 text-white py-3 px-3"
            key={index}
            onClick={() => {
              if (chats.get(item.mobile)) {
                props.chat_selector({
                  user_details: item,
                  msgs: chats.get(item.mobile),
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
                {chats.get(item.mobile) && chats.get(item.mobile).length > 0
                  ? chats.get(item.mobile)[0].msg
                  : null}
              </div>
            </div>

            {/* right section */}
            <div className="flex flex-col gap-y-1 shrink-0">
              <div className="text-chat-pending-0 text-sm font-medium">
                {chats.get(item.mobile) && chats.get(item.mobile).length > 0
                  ? beautify_date(chats.get(item.mobile)[0].msgtime)
                  : null}
              </div>
              <div className="flex items-center justify-end">
                <div className="bg-[#3aa13abf] rounded-full w-6 h-6 text-white flex items-center justify-center">
                  1
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
