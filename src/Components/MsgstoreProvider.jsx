import React, { createContext, useContext, useEffect, useState } from "react";
import { sockcontext } from "./SocketContextProvider";
import axios from "axios";
import { useCookies } from "react-cookie";

// useref can also be used if we only want to change a value withour re rendering a component and also it is a sync fn pbject

let msgcontext = createContext();

function MsgstoreProvider({ children }) {
  let socket = useContext(sockcontext);
  let [contacts, setcontacts] = useState([]);
  let [chats, setchats] = useState(new Map());
  let [cookies, setcookie, removecookie] = useCookies();
  let [contacts_loaded, setcontacts_loaded] = useState(false);

  // get total number of unread chats so that can be updated

  async function fetch_chats(user1, user2) {
    socket.emit("fetch_chats", [user1, user2]);
  }

  // get all contacts
  async function get_chat_history(mobile) {
    let response = await axios.get(
      `http://localhost:8080/api/user/contacts?mobile=${mobile}`
    );

    let contact_details = await Promise.all(
      response.data.contacts.map(async (element) => {
        try {
          let response = await axios.get(
            `http://localhost:8080/api/user/details?mobile=${element}`
          );
          return response.data;
        } catch {
          return null;
        }
      })
    );

    contact_details.sort((a, b) => {
      if (a.name <= b.name) return -1;
      else {
        return 0;
      }
    });

    contact_details.forEach((item, index) => {
      fetch_chats(cookies["user_details"].mobile, item.mobile);
    });

    setcontacts(contact_details);
    setcontacts_loaded(true);
  }

  function update_chats(msg, user_mob) {
    let sender_mobile = user_mob;
    console.log("Updating the chats messages");
    setchats((prev) => {
      if (prev.get(sender_mobile)) {
        prev.get(sender_mobile).chats.push(msg);
        prev
          .get(sender_mobile)
          .chats.sort((a, b) => new Date(b.msgtime) - new Date(a.msgtime));
        console.log(new Map(prev));
        if (msg.sender !== cookies["user_details"].mobile)
          prev.get(sender_mobile).unread += 1;
      }

      // // means user is not in the contact list
      // axios
      //   .get(`http://localhost:8080/api/user/details?mobile=${user_mob}`)
      //   .then((response) => {
      //     setcontacts((prev) => [...prev, response.data]);
      //     prev.set(user_mob, { chats: [msg], unread: 1 });
      //   });

      return new Map(prev);
    });
  }

  useEffect(() => {
    get_chat_history(cookies["user_details"].mobile);

    // register event handlers
    socket.on("msg", (msg) => {
      update_chats(msg, msg.sender);
    });

    socket.on("chats_fetched", (data) => {
      setchats((prev_chats) => {
        let new_map = new Map(prev_chats);
        let unread = 0;
        data.chats.forEach((item) => {
          if (item.msgread === false && item.sender === data.users[1])
            unread += 1;
        });
        new_map.set(data.users[1], { chats: data.chats, unread: unread });
        return new_map;
      });
    });

    // on users message that are read by the other user
    socket.on("all_msg_read", (mobile) => {
      let changed = false;
      setchats((prev) => {
        console.log("Previous is : ", prev);
        prev.get(mobile).chats.forEach((item, index) => {
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
        setchats: setchats,
        setcontacts: setcontacts,
        contacts_loaded: contacts_loaded,
      }}
    >
      {children}
    </msgcontext.Provider>
  );
}

export { MsgstoreProvider, msgcontext };
