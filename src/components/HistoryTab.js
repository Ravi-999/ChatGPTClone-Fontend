import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../images/Logo.svg";
import newChat from "../images/newChat.svg";
import threeDots from "../images/threedots.svg";
import rename from "../images/rename.svg";
import deleteIcon from "../images/deleteIcon.svg";
import LogOut from "../images/LogOut.svg";

function HistoryTab({ chatID }) {
  const { clearContent, chatHistory, user, deleteChat } = useAuth();
  // const [modal, setModal] = useState(false);

  // const modalRef = useRef(null);
  const navigate = useNavigate();

  const newChatHandler = () => {
    clearContent(chatID);
    navigate("/");
  };

  // useEffect(() => {
  //   const handleOutsideClick = (event) => {
  //     if (modalRef.current && !modalRef.current.contains(event.target)) {
  //       setModal(false);
  //     }
  //   };

  //   if (modal) {
  //     document.addEventListener("mousedown", handleOutsideClick);
  //   }

  //   return () => {
  //     document.removeEventListener("mousedown", handleOutsideClick);
  //   };
  // }, [modal]);

  return (
    <>
      <div
        className="flex items-center justify-between sticky top-0 p-4 bg-[black] w-[100%] z-10"
        onClick={newChatHandler}
      >
        <div className="hover:bg-[#202123] cursor-pointer w-[100%] rounded-md p-2 flex items-center justify-between">
          <div>
            <img
              className="inline-block w-8 h-8 mr-2 bg-[#fff] rounded-3xl p-1"
              src={Logo}
            />
            <h1 className="text-[#fff] inline-block">New Chat</h1>
          </div>
          <img src={newChat} className="w-5 h-5" />
        </div>
      </div>
      <ol className="bg-[black]">
        {chatHistory.map((chatItem) => (
          <li className="cursor-pointer relative" key={chatItem.chatID}>
            <Link to={`/c/${chatItem.chatID}`}>
              <div
                className={`relative rounded-lg hover:bg-[#202123] p-2  ${
                  chatID === chatItem.chatID ? "bg-[#202123]" : ""
                }`}
              >
                <p>
                  <span className="text-[#fff]">
                    {chatItem.chatDescription.length > 30
                      ? chatItem.chatDescription.substring(0, 28)
                      : chatItem.chatDescription}
                  </span>
                </p>
              </div>
              {chatID === chatItem.chatID && (
                <div
                  className="absolute right-3 top-2 text-[#fff]"
                  onClick={() => deleteChat()}
                >
                  <img src={deleteIcon} />
                </div>
              )}
            </Link>
            {/* {modal && chatID === chatItem.chatID && (
              <div
                ref={modalRef}
                className="absolute right-10 top-8 bg-[#2b2c2e] p-2 z-50 rounded-md"
              >
                <ol className="text-[#fff]">
                  <li className="mt-2 hover:border hover:border-solid-white p-2">
                    <img className="inline-block mr-3 w-5 h-5" src={rename} />
                    <span>Rename</span>
                  </li>
                  <li className="mt-2 hover:border hover:border-solid-white p-2">
                    <img
                      className="inline-block mr-2 w-5 h-5 mr-3"
                      src={deleteIcon}
                    />
                    <span>Delete</span>
                  </li>
                </ol>
              </div>
            )} */}
          </li>
        ))}
      </ol>
      <div className="fixed bottom-0 p-2 w-[20%] text-[#fff] bg-[black] py-3 ">
        <div className="flex items-center justify-center">
          <img src={user.picture} className="h-6 w-6 rounded-full" />
          <p className="ml-2">{user.name}</p>
        </div>
        <div
          className="flex items-center justify-center mt-2 border border-solid-[gray] p-2 cursor-pointer"
          onClick={() => {
            localStorage.removeItem("chatToken");
            navigate("/login");
          }}
        >
          <img src={LogOut} />
          <p className="ml-2">Logout</p>
        </div>
      </div>
    </>
  );
}

export default HistoryTab;
