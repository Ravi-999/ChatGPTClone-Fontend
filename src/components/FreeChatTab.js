import React from "react";
import {
  Navigate,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import Logo from "../images/Logo copy.svg";
import fork from "../images/gitFork.svg";
import user from "../images/user.svg";

function FreeChatTab() {
  const { shareID } = useParams();
  console.log(shareID);
  const navigate = useNavigate();
  const { chat } = useLoaderData();
  const { content } = chat;
  const date = new Date(chat.createdAt);
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return (
    <div className="bg-[#343541] h-[100vh] overflow-scroll">
      <div className="mx-auto w-[50%] pb-5 border-b-2 border-b-[#fff] mt-4">
        <h1 className="text-[#fff] font-bold text-3xl ">
          {chat.chatDescription}
        </h1>
        <span className="text-[#AFB2B8] mt-2 inline-block">
          {formattedDate}
        </span>
      </div>
      <div className="absolute top-4 right-2">
        <button
          className="border border-solid border-[#666666] rounded-md px-3 py-2 block mt-2"
          onClick={() => {
            navigate("/login", { state: { shareID } });
          }}
        >
          <span className="mr-2 inline-block align-middle text-[#fff]">
            Fork Chat
          </span>
          <img
            className="h-8 w-8 opacity-65 border border-solid-[#666666] p-2 rounded-md cursor-pointer mt-2 bg-[#fff] inline-block align-middle"
            src={fork}
          />
        </button>
      </div>

      {content?.map((Item) => {
        return (
          <div className="w-[50%] mx-auto" key={Math.random()}>
            <div key={Math.random()} className="text-[#fff]">
              <div className="mt-6">
                <img className="inline-block h-6 w-6 rounded-full" src={user} />
                <p className="inline-block ml-2 text-[#ECECF1] font-bold">
                  Anonymous
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
  console.log("loader calle");
  const { shareID } = params;
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/share/${shareID}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("chatToken")}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (response.status !== 200) throw new Error("page Expired");
  return response.json();
};
export default FreeChatTab;
