import React, { useState } from "react";
import logo from "../assets/WhatsApp-Logo.wine.svg";
import { ct_data } from "../assets/countries_data";
import "../styles/login.css";
import { IoMdArrowBack } from "react-icons/io";

export default function Login() {
  let [dropdown_selected, setselected] = useState(false);
  let [selectedcountry, countryselect] = useState(ct_data[0]);
  let [mobile, setmobile] = useState("");
  let [otpstate, setotpstate] = useState(false);
  let [otp, setotp] = useState("");
  return (
    <div className="bg-black h-screen w-screen relative flex items-center pt-24 justify-center">
      <div className="header bg-[#46A384] h-[30vh] p-5 absolute top-0 left-0 right-0">
        <div className="flex items-center text-white font-semibold">
          <img src={logo} className="w-16 h-16" alt="" />
          <div>WHATSAPP WEB</div>
        </div>
      </div>
      <div className=" bg-white w-[80%] max-w-[800px] h-full z-50 flex pt-28 flex-col  items-center gap-y-4">
        <div className=" text-5xl text-black/55">
          {!otpstate ? "Enter Phone Number" : "Enter the OTP"}
        </div>

        {!otpstate ? (
          <>
            <div>Select a country and enter your Whatsapp phone number</div>
            <div
              className="custom_selector w-80 h-16 border-2 p-4 relative"
              onClick={() => setselected(!dropdown_selected)}
            >
              <div className="flex gap-2 items-center">
                <img
                  src={selectedcountry.flag_url}
                  className="w-5 h-5"
                  alt=""
                />
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
              <div className="p-2 border-r-2">
                {"+" + selectedcountry.phone_code}
              </div>
              <input
                className=" h-16  rounded-sm p-4 mobile_input grow"
                type="tel"
                name=""
                placeholder="Enter your mobile number"
                id=""
                value={mobile}
                onChange={(event) => setmobile(event.target.value)}
              />
            </div>
          </>
        ) : (
          <input
            className=" h-16  rounded-sm p-4 mobile_input border-2"
            type="tel"
            name=""
            placeholder="Enter the OTP received"
            id=""
            value={otp}
            onChange={(event) => setotp(event.target.value)}
          />
        )}

        <button
          onClick={() => {
            if (!otpstate) {
              setotpstate(true);
            }
          }}
          className="bg-[#347D69] w-20 h-10 rounded-sm flex items-center justify-center text-white"
        >
          {!otpstate ? "Next" : "Submit"}
        </button>

        {otpstate ? (
          <div
            onClick={() => {
              setotpstate(false);
            }}
            className="w-10 h-10 border-black/15 border-2 text-black  bg-white rounded-full flex items-center justify-center"
          >
            <IoMdArrowBack />
          </div>
        ) : null}
      </div>
    </div>
  );
}
