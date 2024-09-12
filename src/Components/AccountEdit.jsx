import React, { useState } from "react";
import profile from "../assets/profile.jpg";
import { CiEdit } from "react-icons/ci";
import { IoMdCheckmark } from "react-icons/io";

export default function AccountEdit() {
  let [name_disabled, setname_disabled] = useState(true);
  let [about_disabled, setabout_disabled] = useState(true);
  let [name, setname] = useState("ANKIT KUMAR");
  let [about, setabout] = useState("Hello I am using whatsapp");
  return (
    <div className="flex flex-col max-w-[500px] min-w-[350px] gap-y-4 p-5 shadow-black/25 shadow-md absolute top-full rgiht-full z-[1000] bg-[#f1eeee]">
      <img src={profile} className="w-20 h-20 rounded-full" alt="" />
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={name}
          className="grow text-[24px] bg- font-bold p-1"
          disabled={name_disabled}
          onChange={(event) => setname(event.target.value)}
        />
        {name_disabled ? (
          <CiEdit
            className="w-5 h-5 hover:bg-black/10"
            onClick={() => setname_disabled(!name_disabled)}
          />
        ) : (
          <IoMdCheckmark
            className="w-5 h-5 hover:bg-black/10"
            onClick={() => setname_disabled(!name_disabled)}
          />
        )}
      </div>

      <div>
        About
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={about}
            className="grow p-1"
            disabled={about_disabled}
            onChange={(event) => setabout(event.target.value)}
          />
          {about_disabled ? (
            <CiEdit
              className="w-5 h-5 hover:bg-black/10"
              onClick={() => setabout_disabled(!about_disabled)}
            />
          ) : (
            <IoMdCheckmark
              className="w-5 h-5 hover:bg-black/10"
              onClick={() => setabout_disabled(!about_disabled)}
            />
          )}
        </div>
      </div>

      <div>
        Phone Number
        <div>+91 7073430939</div>
      </div>
      <div className="h-[1px] bg-black/25 w-full"></div>
      <button className="justify-center items-center w-28 h-10 bg-[#347D69] text-white rounded-md">
        Logout
      </button>
    </div>
  );
}
