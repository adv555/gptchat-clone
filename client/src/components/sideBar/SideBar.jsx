import React, { useState } from "react";
import MobileMenu from "./MobileMenu";
import Navigation from "./Navigation";

const SideBar = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <MobileMenu setShow={setShow} show={show} />
      <div
        className={`${show && " flex flex-col"} ${
          !show && "hidden"
        } bg-black md:fixed md:inset-y-0 md:flex md:w-[260px] md:flex-col`}
      >
        <div className="flex h-full min-h-0 flex-col">
          <div className="flex h-full flex-1 items-start border-white/20">
            <Navigation />
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
