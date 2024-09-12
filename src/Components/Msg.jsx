import React, { useEffect, useRef, useState } from "react";
import LargePreview from "./LargePreview";

export default function Msg(props) {
  let [objurl, seturl] = useState(null);

  // one nice use of ref loved this
  let url_ref = useRef();

  // useeffects run the cleanup function on every dependency change or when the components unmounts
  // not on the first time when the component is mounted
  // refs can be used to store any pointer like things not only htmls they are technically objects that will have same
  //  address throughout the component but its property current can be updated time to time in this way we will have latest changes every time.
  useEffect(() => {
    if (props.msg.msgtype != "text") {
      let url = URL.createObjectURL(
        new Blob([props.msg.media_data], { type: props.msg.msgtype })
      );
      url_ref.current = url;

      seturl(url);
    }

    return () => {
      console.log("Deletingg object with url : ", url_ref.current);
      if (url_ref.current) URL.revokeObjectURL(url_ref.current);
    };
  }, [Msg]);

  function render_msg(msg) {
    switch (msg.msgtype.toLowerCase()) {
      case "text": {
        return <div className="msg">{msg.msg}</div>;
      }

      case "photo": {
        return <img className="w-96" src={objurl}></img>;
      }

      case "video": {
        return <video className="w-80" src={objurl} controls></video>;
      }

      default:
        break;
    }
  }
  return render_msg(props.msg);
}
