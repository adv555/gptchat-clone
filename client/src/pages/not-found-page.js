import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center h-screen flex-col bg-lightBlack">
      <h1 className="m-0 font-bold text-2xl sm:text-4xl text-white/70">
        404 - Not Found
      </h1>
      <Link
        to="/chat"
        className="text-green hover:text-greenHover underline mt-2 ml-2 "
      >
        Go back to chat
      </Link>
    </div>
  );
};

export default NotFoundPage;
