import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import { io } from "socket.io-client";

let sockcontext = createContext();

function SocketContextProvider({ children }) {
  let [socketstate, setsockstate] = useState(false);
  let [cookie, setcookie, removecookie] = useCookies();
  let socket = useMemo(() => {
    let sock = io("http://localhost:9000", {
      auth: {
        mobile: cookie["user_details"].mobile,
      },
    });

    return sock;
  }, []);

  // register some event listeners to it
  useEffect(() => {
    socket.on("connect", () => console.log("Connected to the whatsapp server"));
    socket.on("disconnect", () =>
      console.log("disconnected from whatsapp server!!")
    );
  }, []);

  return <sockcontext.Provider value={socket}>{children}</sockcontext.Provider>;
}

export { sockcontext, SocketContextProvider };
