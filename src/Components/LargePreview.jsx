import React from "react";
import { IoMdArrowBack } from "react-icons/io";

export default function LargePreview() {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen">
      <IoMdArrowBack className="w-10 h-10 absolute top-0 left-0" />
    </div>
  );
}
