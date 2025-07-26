import React from "react";
import Comment from "./Comment";

const Post = ({
  post,
  currentUserId,
  onLike,
  onDelete,
  onCommentSubmit,
  onCommentChange,
  commentValue,
}) => {
  return (
    <div className="post" key={post._id}>
      <div className="post-author">@{post.author.username}</div>
      <div className="post-content">{post.content}</div>

      <div className="post-comments">
        {post.comments.map((c, i) => (
          <Comment key={i} comment={c} />
        ))}
      </div>

      <form
        className="comment-form"
        onSubmit={(e) => onCommentSubmit(e, post._id)}
      >
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentValue || ""}
          onChange={(e) => onCommentChange(post._id, e.target.value)}
        />
        <button type="submit">Post</button>
      </form>

      <div className="post-footer">
        <span>{new Date(post.createdAt).toLocaleString()}</span>
        <div className="post-actions">
          <button
            className={`like-button ${
              post.likes.includes(currentUserId) ? "liked" : ""
            }`}
            onClick={() => onLike(post._id)}
          >
            ❤️ {post.likes.length}
          </button>
          {post.author._id === currentUserId && (
            <button onClick={() => onDelete(post._id)}>🗑</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
