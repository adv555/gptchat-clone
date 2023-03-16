import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const CallbackPage = () => {
  const { error } = useAuth0();

  if (error) {
    return (
      <div className="w-full h-screen flex justify-center items-center flex-col ">
        <div className="flex flex-col flex-1 w-full m-h-[640px] shrink-0 p-12">
          <h1 className="m-0 text-lg  text-red-500">Error</h1>
          <div className="text-4xl">
            <p className="text-lightBlack">
              <span>{error.message}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col flex-1 basis-auto shrink-0 mt-2 sm:mt-24 w-full" />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center flex-col w-full h-screen ">
      <div className="flex flex-col flex-1 basis-auto shrink-0 w-full items-center justify-center ">
        <h1>
          <span className="text-xl animate-pulse ease-linear">Loading...</span>
        </h1>
      </div>
    </div>
  );
};

export default CallbackPage;
