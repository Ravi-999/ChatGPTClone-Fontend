import { createContext, useContext, useEffect, useState } from "react";
import { v4 as UUID } from "uuid";
import callAPI from "../service/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [chatHistory, setChatHistory] = useState([]);
  const [content, setContent] = useState([]);
  const [chatID, setChatID] = useState(null);
  const [shareID, setShareID] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(window.location.pathname);
    // if (window.location.pathname.includes("share")) {
    //   const shareUrl = window.location.pathname.substring(1);
    //   console.log("hiie");
    //   navigate(`${shareUrl}`);
    //   setIsLoading(false);
    //   return;
    // }
    const token = localStorage.getItem("chatToken");
    console.log(token, user);
    if (!token) {
      console.log("redirecting the user");
      navigate("/login");
      setIsLoading(false);
      return;
    }
    userOnLoad();
  }, [user]);

  const userOnLoad = (shareID) => {
    setIsLoading(true);
    Promise.all([
      getHistory(),
      getContent(),
      user ? Promise.resolve() : getUserDetails(),
    ]).then(async () => {
      if (shareID) {
        const newChatID = await getForkedChat(
          `${window.location.origin}/share/${shareID}`
        );
        if (newChatID) navigate(`/c/${newChatID}`);
      }
      setIsLoading(false);
    });
  };

  const addContent = async (question) => {
    const payload = { question };
    if (content.length === 0) {
      const newID = UUID();
      const newURL = `${window.location.origin}/c/${newID}`;
      window.history.pushState({}, null, newURL);
      payload.chatID = newID;
    } else {
      payload.chatID = chatID;
    }
    // const answer = await callAPI();
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/c/answer`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("chatToken")}`,
        },
        body: JSON.stringify(payload),
      }
    );
    checkRedirection(response);
    const { randomAnswer } = await response.json();
    setContent((prevState) => [
      ...prevState,
      { question, answer: randomAnswer },
    ]);
    console.log("chatID for ref", chatID, content);
    if (content.length === 0) {
      setChatID(payload.chatID);
      setChatHistory((prevState) => [
        { chatID: payload.chatID, chatDescription: question },
        ...prevState,
      ]);
    }
  };
  const clearContent = (chatID) => {
    if (content.length !== 0) {
      // setChatHistory((prevState) => [
      //   ...prevState,
      //   { chatID, metaData: content[0].question },
      // ]);
      setContent([]);
      setChatID(null);
    }
  };

  const getHistory = async () => {
    console.log("history called", localStorage.getItem("chatToken"));
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/c/history`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("chatToken")}`,
          "Content-Type": "application/json",
        },
      }
    );
    checkRedirection(response);
    //fetch call to get entire history
    const history = await response.json();
    console.log("Got history", history);
    setChatHistory(history);
  };

  const getContent = async (chatId) => {
    console.log(content);
    console.log("get content called");
    if (!chatId && !chatID) return;
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/c/getChat/${chatId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("chatToken")}`,
          "Content-Type": "application/json",
        },
      }
    );
    checkRedirection(response);
    const data = await response.json();
    console.log(data);
    const { content: contentArray, shareID } = data;
    console.log("Got content", contentArray, chatID, chatId, shareID);
    if (!chatID) {
      console.log("got the chatID", chatId);
      setChatID(chatId);
    }
    setContent(contentArray);
    setShareID(shareID);
  };

  const getUserDetails = async () => {
    console.log(
      "userDetails called for:-",
      user,
      localStorage.getItem("chatToken")
    );
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/c/getUser`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("chatToken")}`,
          "Content-Type": "application/json",
        },
      }
    );
    checkRedirection(response);
    const data = await response.json();
    console.log("userData", data);
    const { fullName: name, email, picture, userID } = data;
    console.log("Got the user", name, email, picture, userID);
    setUserDetails({ name, email, picture, userID });
  };

  const setUserDetails = (user) => {
    setUser(user);
  };

  const deleteChat = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/c/deleteChat`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("chatToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatID }),
      }
    );
    checkRedirection(response);
    await response.json();
    setChatHistory((prevState) => [
      ...prevState.filter((chatItem) => chatItem.chatID !== chatID),
    ]);
    setChatID(null);
    setContent([]);
    navigate("/");
  };

  const checkRedirection = (response) => {
    if (response.status === 403 || response.status === 401) {
      localStorage.removeItem("chatToken");
      navigate("/login");
    }
  };

  const getShareLink = async (isNew) => {
    if (!isNew && shareID) {
      await navigator.clipboard.writeText(
        `${window.location.origin}/share/${shareID}`
      );
      return;
    }
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/c/sharedlink/${chatID}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("chatToken")}`,
          "Content-Type": "application/json",
        },
      }
    );
    const { shareID: newShareID } = await response.json();
    console.log(
      "getting share link",
      chatID,
      "the shareID i got:- ",
      newShareID
    );
    console.log("content for this IDs", content);
    console.log(`${window.location.origin}/share/${newShareID}`);
    await navigator.clipboard.writeText(
      `${window.location.origin}/share/${newShareID}`
    );
    setShareID(newShareID);
  };

  const getForkedChat = async (link) => {
    try {
      console.log("forked Link", link);
      let regex =
        /([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})[^/]*$/;
      let match = link.match(regex);
      let shareID = match[1];
      console.log("forking the chat having shareID :-", shareID);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/c/fork/forkChat/${shareID}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("chatToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      checkRedirection(response);
      const chatData = await response.json();
      console.log(chatData);
      setChatHistory((prevState) => [
        {
          chatID: chatData.chatID,
          chatDescription: chatData.chatDescription,
        },
        ...prevState,
      ]);
      setContent(chatData.content);
      setChatID(chatData.chatID);
      return chatData.chatID;
    } catch (err) {
      navigate("/error");
      // throw new Error("Unable to fork, please paste correct link");
    }
  };

  const contextData = {
    content,
    chatHistory,
    addContent,
    deleteChat,
    clearContent,
    getContent,
    setChatID,
    setUserDetails,
    user,
    chatID,
    shareID,
    getShareLink,
    getForkedChat,
    userOnLoad,
  };
  return (
    <AuthContext.Provider value={contextData}>
      {isLoading ? <p>Loading ...</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContextProvider;
