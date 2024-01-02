import React, { useEffect, useRef, useState } from "react";
import closeIcon from "../images/closeIcon.svg";
import shareChatIcon from "../images/shareChatIcon.svg";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function ForkModal({ closeModal, isOpen }) {
  const { getForkedChat } = useAuth();
  const [fork, setFork] = useState(false);
  const [forkLink, setForkLink] = useState("");
  const modalRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal && closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const forkSharedLink = () => {
    if (forkLink === "") {
      alert("please paste the link to fork!");
      return;
    }
    setFork(true);
    setTimeout(async () => {
      const shareID = await getForkedChat(forkLink);
      closeModal(shareID);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-gray-600/70">
      <div
        className="fixed z-200 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#202123] w-[40%] rounded-md p-2"
        ref={modalRef}
      >
        <div className="flex items-center justify-between p-4 border-b border-b-[#666666]">
          <h1 className="text-[#d9d9e3] font-semibold text-lg">
            Paste link to Chat
          </h1>
          <img
            className="opacity-50 cursor-pointer"
            src={closeIcon}
            onClick={() => closeModal()}
          />
        </div>
        <div className="p-4">
          <p className="text-[#8e8e9f]">
            Messages you create after forking the link won't be shared. Forked
            message will appear in your chat to continue chatting
          </p>
        </div>
        {/* <div className="h-[40vh] overflow-scroll p-4 rounded-lg">
          <div className="bg-[#343541] p-2">
            <ChatTab content={content} />
          </div>
        </div> */}
        <div className="p-4">
          <input
            type="text"
            className="focus:outline-none bg-[#ECECF1] w-[70%]"
            onChange={(e) => setForkLink(e.target.value)}
          />
          <button
            className="bg-[#1B7F64] p-1 rounded-md mt-5 ml-3 hover:opacity-80"
            onClick={() => {
              forkSharedLink();
            }}
          >
            <img src={shareChatIcon} className="inline-block" />{" "}
            <span className="text-[#fff]">
              {fork ? "Forked!" : "Fork Link"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForkModal;
