import React from "react";
import { ReactComponent as AiIcon } from "../../assets/ai-icon.svg";

const Thinking = () => {
  return (
    <div className="message">
      <div className="message__wrapper flex">
        <div className="w-8 h-8 rounded bg-green text-slate-50 p-2 mr-2">
          <AiIcon />
        </div>

        <div className="text-left message__createdAt">
          <div className="message__thinking">thinking...</div>
        </div>
      </div>
    </div>
  );
};

export default Thinking;
