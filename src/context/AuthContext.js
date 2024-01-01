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
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("chatToken");
    console.log(token);
    if (!token) {
      console.log("redirecting the user");
      navigate("/login");
      return;
    }
    userOnLoad();
  }, []);

  const userOnLoad = () => {
    Promise.all([
      getHistory(),
      getContent(),
      user ? Promise.resolve() : getUserDetails(),
    ]).then(() => {
      setIsLoading(false);
    });
  };

  const addContent = async (question) => {
    const payload = { question };
    if (content.length === 0) {
      const newID = UUID();
      const newURL = `${window.location.href}${newID}`;
      window.history.pushState({}, null, newURL);
      payload.chatID = newID;
    } else {
      payload.chatID = chatID;
    }
    // const answer = await callAPI();
    const response = await fetch("http://localhost:3001/c/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("chatToken")}`,
      },
      body: JSON.stringify(payload),
    });
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
        ...prevState,
        { chatID: payload.chatID, chatDescription: question },
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
    console.log("history called");
    const response = await fetch("http://localhost:3001/c/history", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("chatToken")}`,
        "Content-Type": "application/json",
      },
    });
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
    const response = await fetch(`http://localhost:3001/c/getChat/${chatId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("chatToken")}`,
        "Content-Type": "application/json",
      },
    });
    checkRedirection(response);
    const chatArray = await response.json();
    console.log("Got content", chatArray, chatID, chatId);
    if (!chatID) {
      console.log("got the chatID", chatId);
      setChatID(chatId);
    }
    setContent(chatArray);
  };

  const getUserDetails = async () => {
    console.log("userDetails called");
    const response = await fetch("http://localhost:3001/c/getUser", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("chatToken")}`,
        "Content-Type": "application/json",
      },
    });
    checkRedirection(response);
    const data = await response.json();
    console.log("userData", data);
    const { fullName: name, email } = data;
    console.log("Got the user", name, email);
    setUserDetails({ name, email });
  };

  const setUserDetails = (user) => {
    setUser(user);
  };

  const checkRedirection = (response) => {
    if (response.status === 403 || response.status === 401) {
      localStorage.removeItem("chatToken");
      navigate("/login");
    }
  };

  const contextData = {
    content,
    chatHistory,
    addContent,
    clearContent,
    getContent,
    setChatID,
    setUserDetails,
    user,
    chatID,
  };
  return (
    <AuthContext.Provider value={contextData}>
      {isLoading ? <p>Loading ...</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContextProvider;
