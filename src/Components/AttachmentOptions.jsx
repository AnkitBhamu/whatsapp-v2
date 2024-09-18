import React, { useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { IoDocumentOutline } from "react-icons/io5";
import { TfiVideoClapper } from "react-icons/tfi";
import MediaOptions from "../utils/mediatypes";
import PreviewMsg from "./PreviewMsg";

export default function ({ msg_sender, active }) {
  let [preview, setpreview] = useState(false);
  let [fileselected, setfileselected] = useState(null);

  function handlePreview(media_ele_id) {
    console.log("Handling preview image!!");
    let media_element = document.getElementById(media_ele_id);
    let file = media_element.files[0];

    if (file) {
      setfileselected({ file, type: media_ele_id, name: file.name });
      setpreview(true);
    } else {
      setpreview(false);
      setfileselected(null);
    }
    media_element.value = "";
  }

  return (
    <>
      {preview ? (
        <div
          className={`absolute w-[450px] left-3 p-2  top-[-100vh] h-screen flex flex-col justify-end z-50 `}
        >
          <PreviewMsg
            file={fileselected}
            msg_sender={msg_sender}
            setpreview={setpreview}
            active={active}
          />
        </div>
      ) : null}

      <div
        className={`flex flex-col justify-end h-screen gap-y-2 absolute top-[-100vh] p-1${
          preview ? "hidden" : ""
        }`}
      >
        <div className="shadow-[2px_2px_15px] shadow-black/15 bg-[#f1eeee] rounded-md p-1">
          <MediaOptions
            mediatype={"Photo"}
            handlePreview={handlePreview}
            icon={CiImageOn}
          />
          <MediaOptions
            mediatype={"Video"}
            handlePreview={handlePreview}
            icon={TfiVideoClapper}
          />
          <MediaOptions
            mediatype={"Document"}
            handlePreview={handlePreview}
            icon={IoDocumentOutline}
          />
        </div>
      </div>
    </>
  );
}
