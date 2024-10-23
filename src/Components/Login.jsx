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

export default function Login() {
  let [dropdown_selected, setselected] = useState(false);
  let [selectedcountry, countryselect] = useState(ct_data[0]);
  let [mobile, setmobile] = useState("");
  let [fullname, setfullname] = useState("");
  let [email, setemail] = useState("");
  let [profilepic, setprofilepic] = useState("");
  const [cookies, setcookie, removecookie] = useCookies();
  let navigate = useNavigate();

  function sendLoginInfo() {
    axios
      .get("http://localhost:8080/api/user?mobile=" + mobile)
      .then((response) => {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7);
        setcookie("user_details", response.data, { expires: expirationDate });
        toast("Register Success!!");
        navigate("/home", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Login error!!");
      });
  }

  function signInwithGoogle() {
    console.log("came here");
    const firebaseConfig = {
      apiKey: "AIzaSyCFdujWvHbK-mSsFcC_A7Vo7zgSpaxHZ-0",
      authDomain: "test-app2-46851.firebaseapp.com",
      projectId: "test-app2-46851",
      storageBucket: "test-app2-46851.appspot.com",
      messagingSenderId: "816010912839",
      appId: "1:816010912839:web:13c43bc4c3646950aa3d62",
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const provider = new GoogleAuthProvider();

    // sign in popup
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token.
        const credential = GoogleAuthProvider.credentialFromResult(result);

        // The signed-in user info.
        const user = result.user;
        setfullname(user.displayName);
        setemail(user.email);
        setprofilepic(user.photoURL);
      })
      .catch((error) => {
        console.error(error);
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
      <div className=" bg-white w-[80%] max-w-[800px] h-full z-50 flex pt-28 flex-wrap justify-center items-center p-3 gap-x-2 gap-y-2">
        <div className=" text-5xl text-black/55 w-full flex justify-center">
          Login
        </div>
        <div className="w-full flex justify-center">
          Need to register?{" "}
          <Link to={"/register"} className="text-blue-500">
            Register
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
        {/* <div className="flex items-center border-2 w-80">
          <input
            className=" h-16  rounded-sm p-4 mobile_input grow outline-none"
            type="text"
            name=""
            placeholder="Email"
            id=""
            value={email}
            onChange={(event) => setemail(event.target.value)}
          />
        </div> */}
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
        <div className="w-full justify-center flex">Or</div>
        <div
          className="w-80 h-10 flex gap-3 items-center bg-white p-2 justify-center shadow-sm shadow-black"
          onClick={signInwithGoogle}
        >
          <FcGoogle />
          <div>Continue with google</div>
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
