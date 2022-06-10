import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles.css";
const NewComment = ({ onAddPost }) => {
  const [comment, setcomment] = useState({
    name: "",
    email: "",
    content: "",
  });

  const nameHandler = (e) => {
    setcomment({ ...comment, name: e.target.value });
    console.log(setcomment);
  };
  const emailHandler = (e) => {
    setcomment({ ...comment, email: e.target.value });
  };
  const contentHandler = (e) => {
    setcomment({ ...comment, content: e.target.value });
  };

  return (
    <div className="newComment">
      <div>
        <label htmlFor="">name</label>
        <input type="text" onChange={nameHandler} />
      </div>
      <div>
        <label htmlFor="">email</label>
        <input type="email" onChange={emailHandler} />
      </div>
      <div>
        <label htmlFor="">text</label>
        <input type="textarea" onChange={contentHandler} />
      </div>
      <button onClick={() => onAddPost(comment)}>add new comment</button>
    </div>
  );
};

export default NewComment;
