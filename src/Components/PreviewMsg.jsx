import React from "react";
import { IoDocumentOutline } from "react-icons/io5";
import { LuSendHorizonal } from "react-icons/lu";

function render_msg(filedata) {
  switch (filedata.type.toLowerCase()) {
    case "photo": {
      return <img src={URL.createObjectURL(filedata.file)} alt="" />;
    }
    case "video": {
      return <video src={URL.createObjectURL(filedata.file)} alt="" controls />;
    }

    case "document": {
      return (
        <div className="flex items-center gap-2">
          <IoDocumentOutline className="w-8 h-8" />
          <div>{filedata.name}</div>
        </div>
      );
    }
    default:
      break;
  }
}

export default function PreviewMsg({ file, msg_sender, setpreview, active }) {
  return (
    <div className="bg-[#f1eeee] p-3 rounded-lg shadow-[2px_2px_15px] shadow-black/15">
      {render_msg(file)}
      <button
        className=" flex items-center justify-center send bg-[green] mt-2 text-white rounded-lg p-3"
        onClick={() => {
          let fr = new FileReader();
          fr.onloadend = (event) => {
            msg_sender(event.target.result, file.type);
            setpreview(false);
            active(false);
          };

          fr.readAsArrayBuffer(file.file);
        }}
      >
        <LuSendHorizonal />
      </button>
    </div>
  );
}
