import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as UserIcon } from "../../assets/user-icon.svg";
import { ReactComponent as SendIcon } from "../../assets/send-icon.svg";

export const ChatForm = ({
  inputRef,
  formValue,
  setFormValue,
  sendMessage,
  options,
  selected,
  setSelected,
}) => {
  return (
    <div className="form__wrapper">
      <form
        className="form"
        onSubmit={sendMessage}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage(e);
          }
        }}
      >
        <div className="relative flex h-full flex-1 md:flex-col">
          <div className="ml-1 mt-1.5 md:w-full md:m-auto md:flex md:mb-2 gap-2 justify-center">
            <div className="text-gray-100 p-1 md:hidden">
              <UserIcon />
            </div>
          </div>

          <div className="textarea-wrapper">
            <select
              className="dropdown"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <textarea
              ref={inputRef}
              tabIndex={0}
              data-id="root"
              rows={1}
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              className="textarea"
            ></textarea>
            <button className="send-button" type="submit" disabled={!formValue}>
              <SendIcon className="rotate-90" />
            </button>
          </div>
        </div>
      </form>
      <div className="chat__footer">
        <Link
          to="#"
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          ChatGPT
        </Link>
        &nbsp;Created by
      </div>
    </div>
  );
};
