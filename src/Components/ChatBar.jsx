import React from "react";
import { TbSettings } from "react-icons/tb";
import { BsPlus } from "react-icons/bs";
import { VscSearch } from "react-icons/vsc";
import profile from "../assets/profile.jpg";
import "../styles/chatbar.css";

export default function ChatBar() {
  return (
    <div className="pt-4 px-5 min-w-80 max-w-96  h-screen flex flex-col">
      {/* chatbar heading */}
      <div className="flex justify-between items-center">
        <div className="font-bold text-[24px] text-black">Chats</div>
        <div className="right flex gap-7 items-center">
          <BsPlus className="h-7 w-7" />
          <TbSettings className="h-5 w-5" />
        </div>
      </div>

      {/*  chat search */}
      <div className="search-bar h-10 mt-5 relative shrink-0">
        <input
          type="text"
          placeholder="Search or start new chat"
          className="h-full w-full border-2 border-[#dadada] px-2 text-[#fefefe]"
        />
        <VscSearch className="absolute right-3 top-[50%] translate-y-[-50%] w-4 h-4" />
      </div>

      {/* chats section */}
      <div className="chatbar chat-section mt-6 pr-2 w-full flex flex-col pb-3 gap-y-8 grow overflow-hidden overflow-y-scroll">
        {/* chat*/}
        <div className="chat flex gap-3">
          {/* left section */}
          <img
            src={profile}
            loading="lazy"
            alt="Error!"
            className="w-14 h-14 rounded-full"
          />
          {/* middle section */}
          <div className="flex flex-col gap-y-1">
            <div className="font-bold text-[#0d0d0d]">Maya Kasuma</div>
            <div className="line-clamp-1 text-chat-bar-msg-0">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium veniam, perferendis quisquam reiciendis fuga qui
              recusandae assumenda. Ab, rerum numquam! Adipisci ad perspiciatis
              earum totam cumque sapiente beatae facilis numquam.
            </div>
          </div>

          {/* right section */}
          <div className="flex flex-col gap-y-1">
            <div className="text-chat-pending-0 font-bold">3:48PM</div>
            <div className="flex items-center justify-end">
              <div className="bg-blue-600 rounded-full w-6 h-6 text-white flex items-center justify-center">
                1
              </div>
            </div>
          </div>
        </div>
        {/* chat*/}
        <div className="chat flex gap-3">
          {/* left section */}
          <img
            src={profile}
            loading="lazy"
            alt="Error!"
            className="w-14 h-14 rounded-full"
          />
          {/* middle section */}
          <div className="flex flex-col gap-y-1">
            <div className="font-bold text-[#0d0d0d]">Maya Kasuma</div>
            <div className="line-clamp-1 text-chat-bar-msg-0">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium veniam, perferendis quisquam reiciendis fuga qui
              recusandae assumenda. Ab, rerum numquam! Adipisci ad perspiciatis
              earum totam cumque sapiente beatae facilis numquam.
            </div>
          </div>

          {/* right section */}
          <div className="flex flex-col gap-y-1">
            <div className="text-chat-pending-0 font-bold">3:48PM</div>
            <div className="flex items-center justify-end">
              <div className="bg-blue-600 rounded-full w-6 h-6 text-white flex items-center justify-center">
                1
              </div>
            </div>
          </div>
        </div>
        {/* chat*/}
        <div className="chat flex gap-3">
          {/* left section */}
          <img
            src={profile}
            loading="lazy"
            alt="Error!"
            className="w-14 h-14 rounded-full"
          />
          {/* middle section */}
          <div className="flex flex-col gap-y-1">
            <div className="font-bold text-[#0d0d0d]">Maya Kasuma</div>
            <div className="line-clamp-1 text-chat-bar-msg-0">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium veniam, perferendis quisquam reiciendis fuga qui
              recusandae assumenda. Ab, rerum numquam! Adipisci ad perspiciatis
              earum totam cumque sapiente beatae facilis numquam.
            </div>
          </div>

          {/* right section */}
          <div className="flex flex-col gap-y-1">
            <div className="text-chat-pending-0 font-bold">3:48PM</div>
            <div className="flex items-center justify-end">
              <div className="bg-blue-600 rounded-full w-6 h-6 text-white flex items-center justify-center">
                1
              </div>
            </div>
          </div>
        </div>
        {/* chat*/}
        <div className="chat flex gap-3">
          {/* left section */}
          <img
            src={profile}
            loading="lazy"
            alt="Error!"
            className="w-14 h-14 rounded-full"
          />
          {/* middle section */}
          <div className="flex flex-col gap-y-1">
            <div className="font-bold text-[#0d0d0d]">Maya Kasuma</div>
            <div className="line-clamp-1 text-chat-bar-msg-0">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium veniam, perferendis quisquam reiciendis fuga qui
              recusandae assumenda. Ab, rerum numquam! Adipisci ad perspiciatis
              earum totam cumque sapiente beatae facilis numquam.
            </div>
          </div>

          {/* right section */}
          <div className="flex flex-col gap-y-1">
            <div className="text-chat-pending-0 font-bold">3:48PM</div>
            <div className="flex items-center justify-end">
              <div className="bg-blue-600 rounded-full w-6 h-6 text-white flex items-center justify-center">
                1
              </div>
            </div>
          </div>
        </div>
        {/* chat*/}
        <div className="chat flex gap-3">
          {/* left section */}
          <img
            src={profile}
            loading="lazy"
            alt="Error!"
            className="w-14 h-14 rounded-full"
          />
          {/* middle section */}
          <div className="flex flex-col gap-y-1">
            <div className="font-bold text-[#0d0d0d]">Maya Kasuma</div>
            <div className="line-clamp-1 text-chat-bar-msg-0">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium veniam, perferendis quisquam reiciendis fuga qui
              recusandae assumenda. Ab, rerum numquam! Adipisci ad perspiciatis
              earum totam cumque sapiente beatae facilis numquam.
            </div>
          </div>

          {/* right section */}
          <div className="flex flex-col gap-y-1">
            <div className="text-chat-pending-0 font-bold">3:48PM</div>
            <div className="flex items-center justify-end">
              <div className="bg-blue-600 rounded-full w-6 h-6 text-white flex items-center justify-center">
                1
              </div>
            </div>
          </div>
        </div>
        {/* chat*/}
        <div className="chat flex gap-3">
          {/* left section */}
          <img
            src={profile}
            loading="lazy"
            alt="Error!"
            className="w-14 h-14 rounded-full"
          />
          {/* middle section */}
          <div className="flex flex-col gap-y-1">
            <div className="font-bold text-[#0d0d0d]">Maya Kasuma</div>
            <div className="line-clamp-1 text-chat-bar-msg-0">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium veniam, perferendis quisquam reiciendis fuga qui
              recusandae assumenda. Ab, rerum numquam! Adipisci ad perspiciatis
              earum totam cumque sapiente beatae facilis numquam.
            </div>
          </div>

          {/* right section */}
          <div className="flex flex-col gap-y-1">
            <div className="text-chat-pending-0 font-bold">3:48PM</div>
            <div className="flex items-center justify-end">
              <div className="bg-blue-600 rounded-full w-6 h-6 text-white flex items-center justify-center">
                1
              </div>
            </div>
          </div>
        </div>
        {/* chat*/}
        <div className="chat flex gap-3">
          {/* left section */}
          <img
            src={profile}
            loading="lazy"
            alt="Error!"
            className="w-14 h-14 rounded-full"
          />
          {/* middle section */}
          <div className="flex flex-col gap-y-1">
            <div className="font-bold text-[#0d0d0d]">Maya Kasuma</div>
            <div className="line-clamp-1 text-chat-bar-msg-0">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium veniam, perferendis quisquam reiciendis fuga qui
              recusandae assumenda. Ab, rerum numquam! Adipisci ad perspiciatis
              earum totam cumque sapiente beatae facilis numquam.
            </div>
          </div>

          {/* right section */}
          <div className="flex flex-col gap-y-1">
            <div className="text-chat-pending-0 font-bold">3:48PM</div>
            <div className="flex items-center justify-end">
              <div className="bg-blue-600 rounded-full w-6 h-6 text-white flex items-center justify-center">
                1
              </div>
            </div>
          </div>
        </div>
        {/* chat*/}
        <div className="chat flex gap-3">
          {/* left section */}
          <img
            src={profile}
            loading="lazy"
            alt="Error!"
            className="w-14 h-14 rounded-full"
          />
          {/* middle section */}
          <div className="flex flex-col gap-y-1">
            <div className="font-bold text-[#0d0d0d]">Maya Kasuma</div>
            <div className="line-clamp-1 text-chat-bar-msg-0">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium veniam, perferendis quisquam reiciendis fuga qui
              recusandae assumenda. Ab, rerum numquam! Adipisci ad perspiciatis
              earum totam cumque sapiente beatae facilis numquam.
            </div>
          </div>

          {/* right section */}
          <div className="flex flex-col gap-y-1">
            <div className="text-chat-pending-0 font-bold">3:48PM</div>
            <div className="flex items-center justify-end">
              <div className="bg-blue-600 rounded-full w-6 h-6 text-white flex items-center justify-center">
                1
              </div>
            </div>
          </div>
        </div>
        {/* chat*/}
        <div className="chat flex gap-3">
          {/* left section */}
          <img
            src={profile}
            loading="lazy"
            alt="Error!"
            className="w-14 h-14 rounded-full"
          />
          {/* middle section */}
          <div className="flex flex-col gap-y-1">
            <div className="font-bold text-[#0d0d0d]">Maya Kasuma</div>
            <div className="line-clamp-1 text-chat-bar-msg-0">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium veniam, perferendis quisquam reiciendis fuga qui
              recusandae assumenda. Ab, rerum numquam! Adipisci ad perspiciatis
              earum totam cumque sapiente beatae facilis numquam.
            </div>
          </div>

          {/* right section */}
          <div className="flex flex-col gap-y-1">
            <div className="text-chat-pending-0 font-bold">3:48PM</div>
            <div className="flex items-center justify-end">
              <div className="bg-blue-600 rounded-full w-6 h-6 text-white flex items-center justify-center">
                1
              </div>
            </div>
          </div>
        </div>
        {/* chat*/}
        <div className="chat flex gap-3">
          {/* left section */}
          <img
            src={profile}
            loading="lazy"
            alt="Error!"
            className="w-14 h-14 rounded-full"
          />
          {/* middle section */}
          <div className="flex flex-col gap-y-1">
            <div className="font-bold text-[#0d0d0d]">Maya Kasuma</div>
            <div className="line-clamp-1 text-chat-bar-msg-0">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium veniam, perferendis quisquam reiciendis fuga qui
              recusandae assumenda. Ab, rerum numquam! Adipisci ad perspiciatis
              earum totam cumque sapiente beatae facilis numquam.
            </div>
          </div>

          {/* right section */}
          <div className="flex flex-col gap-y-1">
            <div className="text-chat-pending-0 font-bold">3:48PM</div>
            <div className="flex items-center justify-end">
              <div className="bg-blue-600 rounded-full w-6 h-6 text-white flex items-center justify-center">
                1
              </div>
            </div>
          </div>
        </div>
        {/* chat*/}
        <div className="chat flex gap-3">
          {/* left section */}
          <img
            src={profile}
            loading="lazy"
            alt="Error!"
            className="w-14 h-14 rounded-full"
          />
          {/* middle section */}
          <div className="flex flex-col gap-y-1">
            <div className="font-bold text-[#0d0d0d]">Maya Kasuma</div>
            <div className="line-clamp-1 text-chat-bar-msg-0">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium veniam, perferendis quisquam reiciendis fuga qui
              recusandae assumenda. Ab, rerum numquam! Adipisci ad perspiciatis
              earum totam cumque sapiente beatae facilis numquam.
            </div>
          </div>

          {/* right section */}
          <div className="flex flex-col gap-y-1">
            <div className="text-chat-pending-0 font-bold">3:48PM</div>
            <div className="flex items-center justify-end">
              <div className="bg-blue-600 rounded-full w-6 h-6 text-white flex items-center justify-center">
                1
              </div>
            </div>
          </div>
        </div>
        {/* chat*/}
        <div className="chat flex gap-3">
          {/* left section */}
          <img
            src={profile}
            loading="lazy"
            alt="Error!"
            className="w-14 h-14 rounded-full"
          />
          {/* middle section */}
          <div className="flex flex-col gap-y-1">
            <div className="font-bold text-[#0d0d0d]">Maya Kasuma</div>
            <div className="line-clamp-1 text-chat-bar-msg-0">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium veniam, perferendis quisquam reiciendis fuga qui
              recusandae assumenda. Ab, rerum numquam! Adipisci ad perspiciatis
              earum totam cumque sapiente beatae facilis numquam.
            </div>
          </div>

          {/* right section */}
          <div className="flex flex-col gap-y-1">
            <div className="text-chat-pending-0 font-bold">3:48PM</div>
            <div className="flex items-center justify-end">
              <div className="bg-blue-600 rounded-full w-6 h-6 text-white flex items-center justify-center">
                1
              </div>
            </div>
          </div>
        </div>
        {/* chat*/}
        <div className="chat flex gap-3">
          {/* left section */}
          <img
            src={profile}
            loading="lazy"
            alt="Error!"
            className="w-14 h-14 rounded-full"
          />
          {/* middle section */}
          <div className="flex flex-col gap-y-1">
            <div className="font-bold text-[#0d0d0d]">Maya Kasuma</div>
            <div className="line-clamp-1 text-chat-bar-msg-0">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium veniam, perferendis quisquam reiciendis fuga qui
              recusandae assumenda. Ab, rerum numquam! Adipisci ad perspiciatis
              earum totam cumque sapiente beatae facilis numquam.
            </div>
          </div>

          {/* right section */}
          <div className="flex flex-col gap-y-1">
            <div className="text-chat-pending-0 font-bold">3:48PM</div>
            <div className="flex items-center justify-end">
              <div className="bg-blue-600 rounded-full w-6 h-6 text-white flex items-center justify-center">
                1
              </div>
            </div>
          </div>
        </div>
        {/* chat*/}
        <div className="chat flex gap-3">
          {/* left section */}
          <img
            src={profile}
            loading="lazy"
            alt="Error!"
            className="w-14 h-14 rounded-full"
          />
          {/* middle section */}
          <div className="flex flex-col gap-y-1">
            <div className="font-bold text-[#0d0d0d]">Maya Kasuma</div>
            <div className="line-clamp-1 text-chat-bar-msg-0">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium veniam, perferendis quisquam reiciendis fuga qui
              recusandae assumenda. Ab, rerum numquam! Adipisci ad perspiciatis
              earum totam cumque sapiente beatae facilis numquam.
            </div>
          </div>

          {/* right section */}
          <div className="flex flex-col gap-y-1">
            <div className="text-chat-pending-0 font-bold">3:48PM</div>
            <div className="flex items-center justify-end">
              <div className="bg-blue-600 rounded-full w-6 h-6 text-white flex items-center justify-center">
                1
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
