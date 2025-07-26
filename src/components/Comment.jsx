import React from "react";

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <strong>@{comment.user.username}</strong>: {comment.text}
      <span className="comment-date">
        ({new Date(comment.createdAt).toLocaleTimeString()})
      </span>
    </div>
  );
};

export default Comment;
