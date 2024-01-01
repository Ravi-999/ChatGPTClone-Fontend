import React, { useEffect, useRef } from "react";
import HistoryTab from "../components/HistoryTab";
import ChatTab from "../components/ChatTab";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

function Home() {
  const { chatID } = useParams();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const { addContent, content, getContent, user, chatID: chatIDD } = useAuth();

  console.log(content, chatIDD);
  useEffect(() => {
    console.log("useEffect called as chatID is changed to:-", chatID, user);
    if (!user) {
      navigate("/login");
      return;
    }
    if (user) getContent(chatID);
  }, [chatID]);
  const onSubmitHandler = (e) => {
    const data = inputRef.current.value;
    addContent(data);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-[20%] bg-[pink] h-[100vh] overflow-scroll">
        <HistoryTab chatID={chatID} />
      </div>
      <div className="w-[80%] bg-[green] h-[100vh] overflow-scroll">
        <div className="flex justify-between align-middle sticky top-0 bg-[blue] p-4">
          <h1>GPT 3.5</h1>
          <h1>ShareIcon</h1>
        </div>
        <div className="h-[100vh] mx-auto w-[60%]">
          <ChatTab content={content} chatID={chatID} />
        </div>
        <div className="sticky bottom-1 w-[50%] mx-auto flex items-center">
          <input className="w-full" type="text" ref={inputRef} />
          <button className="inline bg-[yellow]" onClick={onSubmitHandler}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
