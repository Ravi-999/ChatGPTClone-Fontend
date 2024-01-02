import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Logo from "../images/Logo copy.svg";
import OrgLogo from "../images/Logo.svg";

function ChatTab({ content }) {
  const { user } = useAuth();
  if (content?.length === 0)
    return (
      <div className="absolute top-[40%] left-[50%]">
        <img
          className="bg-[#fff] p-1 h-[60px] w-[60px] rounded-full mx-auto mb-4"
          src={OrgLogo}
        />
        <p className=" text-[#fff] text-lg"> How can i help you today ?</p>
      </div>
    );

  return (
    <>
      {content?.map((Item) => {
        return (
          <div key={Math.random()} className="text-[#fff]">
            <div className="mt-6">
              <img
                className="inline-block h-6 w-6 rounded-full"
                src={user.picture}
              />
              <p className="inline-block ml-2 text-[#ECECF1] font-bold">You</p>
              <p className="ml-8 text-[#AFB2B8]">{Item.question}</p>
            </div>

            <div className="mt-6 w-[100%]">
              <img
                className="inline-block bg-[#18C37D] p-1 h-6 w-6 rounded-full"
                src={Logo}
              />
              <p className="inline-block ml-2 text-[#ECECF1] font-bold">
                ChatGPT
              </p>
              <p className="ml-8  break-words text-[#AFB2B8]">{Item.answer}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ChatTab;
