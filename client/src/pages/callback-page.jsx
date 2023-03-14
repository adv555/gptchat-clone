import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export const CallbackPage = () => {
  const { error } = useAuth0();

  if (error) {
    return (
      <div className="">
        <h1 id="" className="">
          Error
        </h1>
        <div className="">
          <p id="">
            <span>{error.message}</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-layout">
      <h1>
        You are being redirected to the application. If you are not redirected
        automatically, please click the link.
      </h1>
      <div className="page-layout__content" />
    </div>
  );
};

export default CallbackPage;
