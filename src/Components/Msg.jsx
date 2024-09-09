import React from "react";

export default function Msg(props) {
  function render_msg(msg) {
    switch (msg.msgtype.toLowerCase()) {
      case "text": {
        return <div className="msg">{msg.msg}</div>;
      }

      case "photo": {
        return (
          <img
            className="w-96"
            src={URL.createObjectURL(
              new Blob([msg.media_data], { type: msg.msgtype })
            )}
          ></img>
        );
      }

      case "video": {
        return (
          <video
            className="w-80"
            src={URL.createObjectURL(
              new Blob([msg.media_data], { type: msg.msgtype })
            )}
            controls
          ></video>
        );
      }

      default:
        break;
    }
  }
  return render_msg(props.msg);
}
