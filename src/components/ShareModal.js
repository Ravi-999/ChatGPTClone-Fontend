import React, { useEffect, useRef, useState } from "react";
import closeIcon from "../images/closeIcon.svg";
import shareChatIcon from "../images/shareChatIcon.svg";
import { useAuth } from "../context/AuthContext";
import ChatTab from "./ChatTab";

function ShareModal({ closeModal, isOpen }) {
  const { content, getShareLink, shareID } = useAuth();
  console.log("Share Modal:- ", shareID);
  const [copy, setCopy] = useState(false);
  const [newLinkcopy, setnewLinkCopy] = useState(false);
  const modalRef = useRef(null);
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

  const generateShareLink = (isNew) => {
    if (isNew) setnewLinkCopy(true);
    else setCopy(true);
    setTimeout(() => {
      closeModal();
      getShareLink(isNew);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-gray-600/70">
      <div
        className="fixed z-200 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#202123] w-[30%] rounded-md p-2"
        ref={modalRef}
      >
        <div className="flex items-center justify-between p-4 border-b border-b-[#666666]">
          <h1 className="text-[#d9d9e3] font-semibold text-lg">
            Share link to Chat
          </h1>
          <img
            className="opacity-50 cursor-pointer"
            src={closeIcon}
            onClick={() => closeModal()}
          />
        </div>
        <div className="p-4">
          <p className="text-[#8e8e9f]">
            Messages you send after creating your link won't be shared. Anyone
            with the URL will be able to view the shared chat.
          </p>
        </div>
        <div className="h-[40vh] overflow-scroll p-4 rounded-lg">
          <div className="bg-[#343541] p-2">
            <ChatTab content={content} />
          </div>
        </div>
        <div>
          <button
            className="bg-[#1B7F64] p-1 rounded-md mt-5 ml-3 hover:opacity-80"
            onClick={() => {
              generateShareLink(false);
            }}
          >
            <img src={shareChatIcon} className="inline-block" />{" "}
            <span className="text-[#fff]">
              {" "}
              {copy ? "Copied!" : shareID ? "Copy Old Link" : "Copy Link"}
            </span>
          </button>
          {shareID && (
            <button
              className="bg-[#1B7F64] p-1 rounded-md mt-5 ml-3 hover:opacity-80"
              onClick={() => {
                generateShareLink(true);
              }}
            >
              <img src={shareChatIcon} className="inline-block" />{" "}
              <span className="text-[#fff]">
                {newLinkcopy ? "Copied!" : "Copy Updated link"}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShareModal;
