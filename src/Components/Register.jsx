import React, { useState } from "react";
import logo from "../assets/WhatsApp-Logo.wine.svg";
import { ct_data } from "../assets/countries_data";
import "../styles/login.css";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function Register() {
  let [dropdown_selected, setselected] = useState(false);
  let [selectedcountry, countryselect] = useState(ct_data[0]);
  let [mobile, setmobile] = useState("");
  let [fullname, setfullname] = useState("");
  let [profilepic, setprofilepic] = useState("");
  const [cookies, setcookie, removecookie] = useCookies();
  let navigate = useNavigate();

  function sendLoginInfo() {
    axios
      .post("http://localhost:8080/api/user/register", {
        name: fullname,
        mobile: mobile,
        profile_pic: profilepic,
        country_code: selectedcountry.phone_code,
      })
      .then((response) => {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7);
        setcookie("user_details", response.data, { expires: expirationDate });
        toast("Register Success!!");
        navigate("/home", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Register error!!");
      });
  }

  return (
    <div className="bg-black h-screen w-screen relative flex items-center pt-24 justify-center">
      <ToastContainer />
      <div className="header bg-[#46A384] h-[30vh] p-5 absolute top-0 left-0 right-0">
        <div className="flex items-center text-white font-semibold">
          <img src={logo} className="w-16 h-16" alt="" />
          <div>WHATSAPP WEB</div>
        </div>
      </div>
      <div className=" bg-white w-[80%] max-w-[800px] h-full overflow-scroll z-50 flex flex-col pt-28 flex-wrap justify-center items-center p-3 gap-x-2 gap-y-4">
        <div className=" text-5xl text-black/55">Welcome to WhatsApp</div>
        <div className="w-full flex justify-center gap-x-2">
          Need to login?
          <Link to={"/login"} className="text-blue-500">
            Login
          </Link>
        </div>
        <div
          className="custom_selector w-80 h-16 border-2 p-4 relative"
          onClick={() => setselected(!dropdown_selected)}
        >
          <div className="flex gap-2 items-center">
            <img src={selectedcountry.flag_url} className="w-5 h-5" alt="" />
            <div>{selectedcountry.country}</div>
          </div>

          {dropdown_selected ? (
            <div className="options max-h-60  absolute top-full z-50 bg-white left-0 right-0 overflow-hidden overflow-y-scroll  shadow-sm">
              {ct_data.map((item, index) => (
                <div
                  className="flex gap-2 items-center h-16 border-2 p-4 hover:bg-black/10 cursor-pointer"
                  key={index}
                  onClick={() => {
                    countryselect(item);
                  }}
                >
                  <img
                    loading="lazy"
                    src={item.flag_url}
                    className="w-5 h-5"
                    alt=""
                  />
                  <div>{item.country}</div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="flex items-center border-2 w-80">
          <input
            className=" h-16  rounded-sm p-4 mobile_input grow outline-none"
            type="text"
            name=""
            placeholder="Full Name"
            id=""
            value={fullname}
            onChange={(event) => setfullname(event.target.value)}
          />
        </div>
        <div className="flex items-center border-2 w-80">
          <div className="p-2 border-r-2">
            {"+" + selectedcountry.phone_code}
          </div>
          <input
            className=" h-16  rounded-sm p-4 mobile_input grow outline-none"
            type="tel"
            name=""
            placeholder="Enter your mobile number"
            id=""
            value={mobile}
            onChange={(event) => setmobile(event.target.value)}
          />
        </div>

        <button
          className="bg-[#347D69] w-20 h-10 rounded-sm flex items-center justify-center text-white"
          onClick={sendLoginInfo}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
