import React from "react";

export const PageLoader = () => {
  const loadingImg = "https://cdn.auth0.com/blog/hello-auth0/loader.svg";

  return (
    <div className="flex justify-center items-center h-screen">
      <img
        src={loadingImg}
        alt="Loading..."
        className="h-20 w-20 m-auto animate-spin-slow"
      />
    </div>
  );
};
