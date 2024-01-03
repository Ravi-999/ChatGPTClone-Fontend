import React from "react";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  console.log(error);
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-l-2 border-red-900 px-2">
      <p className="font-semibold">Unable to Fork!</p>
      <p>please paste valid URL</p>
    </div>
  );
}

export default ErrorPage;
