import React from "react";

export const Image = ({ url }) => {
  return (
    <div className="message__wrapper">
      {url !== "You have reached the limit for today." ? (
        <img
          className="message__img"
          src={url}
          alt="dalle generated"
          loading="lazy"
        />
      ) : (
        <p className="text-base">You have reached the limit for today.</p>
      )}
    </div>
  );
};
