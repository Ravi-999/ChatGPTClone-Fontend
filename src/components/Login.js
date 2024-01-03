import React, { useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { user, setUserDetails, userOnLoad } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("chatToken") && user) {
      userOnLoad(location?.state?.shareID);
      navigate("/");
      return;
    }
  }, [user]);
  const responseMessage = async (response) => {
    console.log(response);
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/google/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(response),
      }
    );
    if (res.status === 401 || res.status === 403) {
      console.log("forbidden anta gaß");
      throw Error("Invalid Credentials");
    }
    const { token, name, email, picture, userID } = await res.json();
    localStorage.setItem("chatToken", token);

    setUserDetails({ name, email, picture, userID });
    navigate("/");
  };

  const errorMessage = (error) => {
    console.log(error);
  };

  const githubLoginHandler = () => {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" +
        process.env.REACT_APP_GITHUB_CLIENT_ID
    );
  };

  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] border-[#666666]">
      <h2 className="ml-12 font-bold text-2xl">ChatGPT</h2>
      <br />
      <br />
      <div className="cursor-pointer">
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      </div>
      {/* <div>
        <button onClick={githubLoginHandler}>Login with Github</button>
      </div> */}
    </div>
  );
}

export default Login;
