import axios from "axios";
import React, { useEffect, useState } from "react";
import Comments from "../../components/comment/Comments";
import FullComment from "../../components/FullComment/FullComment";
import NewComment from "../../components/new-comment/NewComment";
import "./styles.css";
const Discussion = () => {
  const [comments, setComments] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState(false);
  const getComments = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/comments");
      setComments(data);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  const selectHandlerComment = (id) => {
    setSelectedId(id);
  };

  const postCommentHandler = (comment) => {
    axios
      .post("http://localhost:3001/comments", { ...comment })
      .then((res) => axios.get("http://localhost:3001/comments"))
      .then((res) => setComments(res.data))
      .catch();
  };

  return (
    <main>
      <section className="section-comments">
        {comments ? (
          comments
            .slice(0, 5)
            .map((item) => (
              <Comments
                key={item.id}
                name={item.name}
                email={item.email}
                onclick={() => selectHandlerComment(item.id)}
              />
            ))
        ) : (
          <p>loading...</p>
        )}
      </section>
      <section>
        <FullComment commentId={selectedId} setSelectedId={setSelectedId} />
      </section>
      <section>
        <NewComment onAddPost={postCommentHandler} />
      </section>
    </main>
  );
};

export default Discussion;
