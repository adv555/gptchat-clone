import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import moment from "moment";
import { Image } from "./Image";
import { ReactComponent as AiIcon } from "../../assets/ai-icon.svg";

const Message = ({ message, picUrl }) => {
  const { id, createdAt, text, ai = false, selected } = message;

  return (
    <div key={id} className={`${ai && "flex-row-reverse"} message`}>
      {selected === "dalle" && ai ? (
        <Image url={text} />
      ) : (
        <div className="message__wrapper">
          <ReactMarkdown
            className={`message__markdown ${ai ? "text-left" : "text-right"}`}
            children={text}
            remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "language-js");
                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, "")}
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}{" "}
                  </code>
                );
              },
            }}
          />
          <div
            className={`${ai ? "text-left" : "text-right"} message__createdAt`}
          >
            {moment(createdAt).calendar()}
          </div>
        </div>
      )}
      <div>
        {ai ? (
          <div className="flex justify-center items-center cover w-8 h-8 rounded text-slate-50 bg-green p-2">
            <AiIcon />
          </div>
        ) : (
          <img
            className="cover w-8 h-8 rounded bg-green"
            loading="lazy"
            src={picUrl}
            alt="profile pic"
          />
        )}
      </div>
    </div>
  );
};

export default Message;
