import React from "react";
import { LogoIcon } from "../assets/icons";
import { LoginButton, SignUpButton } from "../components/buttons";

const AuthPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <div className="w-96 flex flex-col justify-center items-center">
        <div className="mb-5 w-[41px] h-[41px]">
          <LogoIcon />
        </div>
        <div className="mb-2 text-center">Welcome to ChatGPT</div>
        <div className="mb-4 text-center">
          Log in with your OpenAI account to continue
        </div>
        <div className="flex flex-row gap-3">
          <LoginButton />
          <SignUpButton />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
