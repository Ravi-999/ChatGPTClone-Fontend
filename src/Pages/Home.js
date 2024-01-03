import React, { useEffect, useState } from "react";
import HistoryTab from "../components/HistoryTab";
import ChatTab from "../components/ChatTab";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import shareIcon from "../images/shareIcon.svg";
import fork from "../images/gitFork.svg";
import ShareModal from "../components/ShareModal";
import ForkModal from "../components/ForkModal";

function Home() {
  const { chatID } = useParams();
  const navigate = useNavigate();
  const { addContent, content, getContent, user } = useAuth();
  const [shareModal, setShareModal] = useState(false);
  const [forkModal, setForkModal] = useState(false);
  const [message, setMessage] = useState("");

  console.log(content, chatID);
  useEffect(() => {
    console.log("useEffect called as chatID is changed to:-", chatID, user);
    if (!user) {
      navigate("/login");
      return;
    }
    if (user) getContent(chatID);
  }, [chatID]);

  const closeModal = () => {
    setShareModal(false);
  };
  const closeForkModal = (shareID) => {
    setForkModal(false);
    if (shareID) navigate(`/c/${shareID}`);
  };

  const onSubmitHandler = () => {
    if (message.length !== 0) addContent(message);
    setMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevents the new line in the textarea
      onSubmitHandler();
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`w-[20%] h-[100vh] overflow-scroll bg-[black] ${
          shareModal || forkModal ? "relative z-[-1]" : ""
        }`}
      >
        <HistoryTab chatID={chatID} />
      </div>
      <div className="w-[80%] bg-[#343541] h-[100vh] overflow-scroll">
        <div className="flex justify-between align-middle sticky top-0  p-4 text-[#fff] bg-[#343541] h-[80px]">
          <h1 className="font-bold">
            ChatGPT
            <span className="opacity-70"> 3.5</span>
          </h1>
          <div>
            {chatID && (
              <button
                className="border border-solid border-[#666666] rounded-md p-2"
                onClick={() => setShareModal((prevState) => !prevState)}
              >
                <span className="mr-1">Share Chat</span>
                <img
                  className="h-9 w-9 opacity-65  p-2 rounded-md cursor-pointer inline-block"
                  src={shareIcon}
                />
              </button>
            )}
            <button
              className="border border-solid border-[#666666] rounded-md px-3 py-2 block mt-2"
              onClick={() => setForkModal((prevState) => !prevState)}
            >
              <span className="mr-2 inline-block align-middle">Fork Chat</span>
              <img
                className="h-8 w-8 opacity-65 border border-solid-[#666666] p-2 rounded-md cursor-pointer mt-2 bg-[#fff] inline-block align-middle"
                src={fork}
              />
            </button>
          </div>
        </div>
        <div className="h-[100vh] mx-auto w-[60%]">
          <ChatTab content={content} chatID={chatID} />
        </div>
        <div className="sticky bottom-1 w-[60%] mx-auto flex items-center bg-[#343541]">
          <div className="w-[100%] relative">
            <textarea
              className="resize-none text-[#fff] w-[100%]  bg-[#343541] border border-solid border-[#666666] rounded-2xl h-14 px-3 focus:outline-none pt-4"
              placeholder="Message ChatGPT..."
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div
              className={`absolute right-2 bottom-12  rounded-md p-1.5 hover:bg-[#343541] hover:opacity-50 hover:border hover:border-black ${
                message.length !== 0 ? "bg-[#fff]" : "bg-[#494A54]"
              }`}
              onClick={onSubmitHandler}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-white dark:text-black"
              >
                <path
                  d="M7 11L12 6L17 11M12 18V7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
            {/* </span> */}
            <p className="text-xs mx-auto my-2 text-center text-[#aeaebb]">
              ChatGPT can make mistakes. Consider checking important
              information.
            </p>
          </div>
        </div>
      </div>
      {shareModal && <ShareModal closeModal={closeModal} isOpen={shareModal} />}
      {forkModal && (
        <ForkModal closeModal={closeForkModal} isOpen={forkModal} />
      )}
    </div>
  );
}

export default Home;
