import React, { createContext, useContext, useEffect, useState } from "react";
import { sockcontext } from "./SocketContextProvider";
import axios from "axios";

let msgcontext = createContext();

function MsgstoreProvider({ children }) {
  let socket = useContext(sockcontext);
  let [contacts, setcontacts] = useState([]);
  let [chats, setchats] = useState(new Map());
  let [msgstatus, setmsgstatus] = useState([]);

  // get total number of unread chats so that can be updated

  async function fetch_chats(user1, user2) {
    axios
      .get(
        `http://localhost:8080/api/chats/fetch?user1=${user1}&user2=${user2}`
      )
      .then((response) => {
        setchats((prev_chats) => {
          let new_map = new Map(prev_chats);
          let unread = 0;
          response.data.forEach((item) => {
            if (item.msgread === false) unread += 1;
          });
          console.log("Unread msgs are : ", unread, user2);
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
            fetch_chats(
              JSON.parse(localStorage.getItem("mobile")),
              response.data.mobile
            );
          }
          // using this form for avoiding closure issues as it takes old value as arguement and update it(basically chaining)
        )
        .catch((err) => console.log(err));
    });
  }

  function update_chats(msg, user_mob) {
    let sender_mobile = user_mob;
    console.log("Updating the chats messages");
    setchats((prev) => {
      if (prev.get(sender_mobile)) {
        prev.get(sender_mobile).push(msg);
        prev
          .get(sender_mobile)
          .sort((a, b) => new Date(b.msgtime) - new Date(a.msgtime));
        console.log(new Map(prev));
      }

      return new Map(prev);
    });
  }

  useEffect(() => {
    get_chat_history(JSON.parse(localStorage.getItem("mobile")));

    // register event handlers
    socket.on("msg", (msg) => {
      update_chats(msg, msg.sender);
    });

    // on users message that are read by the other user
    socket.on("all_msg_read", (mobile) => {
      let changed = false;
      setchats((prev) => {
        prev.get(mobile).forEach((item, index) => {
          if (item.msgread === false) {
            item.msgread = true;
            changed = true;
          }
        });
        if (changed) {
          return new Map(prev);
        } else return prev;
      });
    });
  }, []);

  return (
    <msgcontext.Provider
      value={{
        contacts: contacts,
        chats: chats,
        chats_updater: update_chats,
      }}
    >
      {children}
    </msgcontext.Provider>
  );
}

export { MsgstoreProvider, msgcontext };
