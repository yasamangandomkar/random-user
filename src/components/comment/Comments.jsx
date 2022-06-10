import React from "react";
import "./comments.css";
const Comments = ({ name, email, onclick }) => {
  return (
    <div className="comment" onClick={onclick}>
      <p>{name}</p>
      <p>{email}</p>
    </div>
  );
};

export default Comments;
