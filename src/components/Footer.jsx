import React from "react";
import { ImGithub } from "react-icons/im";

const Footer = () => {
  return (
    <div className="flex flex-row absolute bottom-0 w-full justify-between px-7 py-5 mt-auto items-center">
      <div className="flex items-center">
        <img src="/assets/medchatapp.png" alt="MedChatApp" width={60} />
        <span className="font-bold text-xl">MedChatApp</span>
      </div>

      <div className="flex flex-row items-center gap-7 text-gray-700">
        <a className="hover:text-black" href="/">
          Privacy Policy
        </a>

        <a
          className="ml-2 hover:text-black"
          href="https://github.com/jannomeister/med-chat/issues"
        >
          Report a bug
        </a>

        <div className="flex flex-row gap-6 sm:gap4">
          <a
            href="https://github.com/jannomeister/med-chat"
            target="_blank"
            rel="noreferrer"
          >
            <ImGithub
              className="ml-2 cursor-pointer hover:text-black"
              width={20}
              height={20}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
