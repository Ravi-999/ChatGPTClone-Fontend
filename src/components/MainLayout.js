import React from "react";
import AuthContextProvider from "../context/AuthContext";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <AuthContextProvider>
        <Outlet />
      </AuthContextProvider>
    </div>
  );
}

export default MainLayout;
