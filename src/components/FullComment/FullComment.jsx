import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles.css";
const FullComment = ({ commentId, setComments, setSelectedId }) => {
  const [comment, setComment] = useState(null);
  useEffect(() => {
    if (commentId) {
      axios
        .get(`http://localhost:3001/comments/${commentId}`)
        .then((res) => setComment(res.data))
        .catch();
    }
  }, [commentId]);
  const deleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:3001/comments/${commentId}`);
      const { data } = await axios.get("http://localhost:3001/comments");
      setComments(data);
      setSelectedId(null);
      setComment(null);
    } catch (error) {}
  };

  let commentDetail = <p> please select a comment...</p>;
  if (commentId) commentDetail = <p>loading...</p>;

  if (comment) {
    commentDetail = (
      <div className="full-comment">
        <p>{comment.name}</p>
        <p>{comment.email}</p>
        <p>{comment.body}</p>
        <button onClick={deleteHandler}>delete</button>
      </div>
    );
  }
  return commentDetail;
};

export default FullComment;
