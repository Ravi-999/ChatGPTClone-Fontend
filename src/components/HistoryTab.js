import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function HistoryTab({ chatID }) {
  const { clearContent, chatHistory } = useAuth();

  const navigate = useNavigate();

  const newChatHandler = () => {
    clearContent(chatID);
    navigate("/");
  };

  return (
    <>
      <div
        className="flex items-center justify-between sticky top-0 p-2 bg-[red] w-[100%] cursor-pointer"
        onClick={newChatHandler}
      >
        <h1>New Chat</h1>
        <p>An image</p>
      </div>
      <div className="bg-[gray]">
        {chatHistory.map((chatItem) => (
          <Link to={`/${chatItem.chatID}`} key={chatItem.chatID}>
            <p className="p-10 rounded-lg bg-[aqua] my-2">
              {chatItem.chatDescription}
            </p>
          </Link>
        ))}
      </div>
      <div className="sticky bottom-0 bg-[red] p-2 w-[100%]">LoggedIn User</div>
    </>
  );
}

export default HistoryTab;
