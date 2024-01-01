import React, { useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { user, setUserDetails } = useAuth();
  useEffect(() => {
    if (user) {
      navigate("/");
      return;
    }
  }, [user]);
  const responseMessage = async (response) => {
    const res = await fetch("http://localhost:3001/google/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response),
    });
    if (res.status === 401 || res.status === 403) {
      console.log("forbidden anta gaß");
      throw Error("Invalid Credentials");
    }
    const { token, name, email } = await res.json();
    localStorage.setItem("chatToken", token);

    setUserDetails({ name, email });
    navigate("/");
  };

  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
    </div>
  );
}

export default Login;
