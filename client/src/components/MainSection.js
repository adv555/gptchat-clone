import React from "react";

export const MainSection = ({ children }) => {
  return (
    <div className="flex h-full flex-1 flex-col md:pl-[260px] ">
      <main className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1 ">
        <div className="flex-1 overflow-hidden">
          <div className="flex flex-col items-center text-sm h-full md:h-screen  bg-slate-100 dark:bg-lightBlack">
            <div className="text-gray-800 dark:text-gray-100  w-full md:max-w-2xl lg:max-w-3xl md:h-full md:flex md:flex-col">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
