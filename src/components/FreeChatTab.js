import React from "react";
import { useLoaderData, useParams } from "react-router-dom";
import Logo from "../images/Logo copy.svg";

function FreeChatTab() {
  const { chat, picture, name } = useLoaderData();
  const { content } = chat;
  return (
    <div className="bg-[#343541] h-[100vh] overflow-scroll">
      <h1 className="mx-auto w-[50%] pb-5 border-b-2 border-b-[#fff] text-[#fff] font-bold text-3xl mt-4">
        {" "}
        You are seeing Shared Chat of :- {name}{" "}
      </h1>
      {content?.map((Item) => {
        return (
          <div className="w-[50%] mx-auto">
            <div key={Math.random()} className="text-[#fff]">
              <div className="mt-6">
                <img
                  className="inline-block h-6 w-6 rounded-full"
                  src={picture}
                />
                <p className="inline-block ml-2 text-[#ECECF1] font-bold">
                  You
                </p>
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
                <p className="ml-8  break-words text-[#AFB2B8]">
                  {Item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export const getSharedChatData = async ({ request, params }) => {
  const { shareID } = params;
  const response = await fetch(`http://localhost:3001/share/${shareID}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("chatToken")}`,
      "Content-Type": "application/json",
    },
  });
  return response.json();
};
export default FreeChatTab;
