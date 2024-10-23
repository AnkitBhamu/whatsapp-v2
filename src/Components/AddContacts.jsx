import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useContext } from "react";
import { msgcontext } from "./MsgstoreProvider";

export default function AddContacts() {
  let [country_code, setcntcode] = useState("");
  let [mobile, setmobile] = useState("");
  let [cookie, setcookie, removecookie] = useCookies();
  let msgstore = useContext(msgcontext);

  async function add_contact() {
    axios
      .post(`http://localhost:8080/api/user/addcontact`, {
        mobile: cookie["user_details"].mobile,
        addmobile: mobile,
      })
      .then((response) => {
        console.log(response);
        toast("Contact added successfully");
        msgstore.setcontacts((prev) => [...prev, response.data]);
        msgstore.setchats((prev) => prev.set(mobile, { chats: [], unread: 0 }));
      })
      .catch((err) => toast.error(err));
  }
  return (
    <div className="absolute w-[400px] flex flex-col gap-y-3 z-[200] bg-[#f1eeee] p-3 top-full right-100 rounded-sm drop-shadow-md">
      <ToastContainer position="top-right" className="fixed" />
      <input
        type="text"
        placeholder="Country code"
        className="border-2 h-10 p-2"
        value={country_code}
        onChange={(event) => setcntcode(event.target.value)}
      />
      <input
        type="text"
        placeholder="Mobile number"
        className="border-2 h-10 p-2"
        value={mobile}
        onChange={(event) => setmobile(event.target.value)}
      />
      <button
        className="bg-green-600 text-white h-10 rounded-md"
        onClick={add_contact}
      >
        Add
      </button>
    </div>
  );
}
