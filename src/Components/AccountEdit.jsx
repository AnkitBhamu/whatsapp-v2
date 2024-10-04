import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoMdCheckmark } from "react-icons/io";
import { useCookies } from "react-cookie";
import emptyimage from "../assets/empty_image.svg";
import { useNavigate } from "react-router";

export default function AccountEdit() {
  let [name_disabled, setname_disabled] = useState(true);
  let [about_disabled, setabout_disabled] = useState(true);
  let [cookies, setcookie, removecookie] = useCookies();
  let [name, setname] = useState(cookies["user_details"].name);
  let navigate = useNavigate();
  // let [about, setabout] = useState("Hello I am using whatsapp");
  return (
    <div className="flex flex-col max-w-[500px] min-w-[350px] gap-y-4 p-5 shadow-black/25 shadow-md absolute top-full rgiht-full z-[1000] bg-[#f1eeee]">
      <img
        src={cookies["user_details"].profile_pic}
        onError={(event) => (event.target.src = emptyimage)}
        className="w-20 h-20 rounded-full"
        alt=""
      />
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

      {/* <div>
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
      </div> */}

      <div>
        Phone Number
        <div>{cookies["user_details"].mobile}</div>
      </div>
      <div className="h-[1px] bg-black/25 w-full"></div>
      <button
        className="justify-center items-center w-28 h-10 bg-[#347D69] text-white rounded-md"
        onClick={() => {
          removecookie("user_details");
          navigate("/", { replace: true });
        }}
      >
        Logout
      </button>
    </div>
  );
}
