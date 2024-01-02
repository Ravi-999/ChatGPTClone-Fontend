import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function GithubCallback() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setUserDetails } = useAuth();
  const navigate = useNavigate();
  const code = searchParams.get("code");
  console.log(code);
  //   useEffect(() => {
  //     const fetchAccessToken = async () => {
  //       const params =
  //         "?client_id=" +
  //         process.env.REACT_APP_GITHUB_CLIENT_ID +
  //         "&client_secret=" +
  //         process.env.REACT_APP_GITHUB_SECRET_ID +
  //         "&code=" +
  //         code;
  //       const response = await fetch(
  //         "https://github.com/login/oauth/access_token" + params,
  //         {
  //           method: "POST",
  //           headers: {
  //             Accept: "application/json",
  //           },
  //         }
  //       );
  //       if (res.status === 401 || res.status === 403) {
  //         console.log("forbidden anta gaß");
  //         throw Error("Invalid Credentials");
  //       }
  //       const res = await fetch("http://localhost:3001/github/login", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: response,
  //       });
  //       if (res.status === 401 || res.status === 403) {
  //         console.log("forbidden anta gaß");
  //         throw Error("Invalid Credentials");
  //       }
  //       const { token, name, email, picture, userID } = await res.json();
  //       localStorage.setItem("chatToken", token);

  //       setUserDetails({ name, email, picture, userID });
  //       navigate("/");
  //     };
  //     fetchAccessToken();
  //   }, []);
  return (
    <div>
      <h1> hello</h1>
    </div>
  );
}

export default GithubCallback;
