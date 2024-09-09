import React from "react";
import mediatypes from "./mediatypes";

export default function (props) {
  return (
    <div className="p-2 hover:bg-black/10 cursor-pointer">
      <label htmlFor={props.mediatype}>
        <div className="flex gap-2 items-center">
          <props.icon className="w-7 h-7" />
          <div>{props.mediatype}</div>
        </div>
      </label>
      <input
        type="file"
        accept={mediatypes[props.mediatype.toLowerCase()] + "/*"}
        className="photos_videos hidden"
        id={props.mediatype}
        onChange={() => {
          props.handlePreview(props.mediatype);
        }}
      />
    </div>
  );
}
