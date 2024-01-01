import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function ChatTab({ content }) {
  const { chatID } = useAuth();
  console.log("from chatTab:-", chatID);
  if (content.length === 0)
    return <p className="absolute top-[50%] left-[50%]"> How can i help you</p>;

  return (
    <>
      {content.map((Item) => {
        return (
          <div key={Math.random()}>
            <p>You</p>
            <p>{Item.question}</p>
            <p>ChatGPT</p>
            <p>{Item.answer}</p>
          </div>
        );
      })}
    </>
  );
}

export default ChatTab;
