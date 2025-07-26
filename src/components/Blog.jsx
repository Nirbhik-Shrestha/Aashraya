import React from "react";
import "./Blog.css";

const Blog = ({ blog }) => {
  return (
    <div className="blog-card">
      <h3 className="blog-title">{blog.title}</h3>
      <p className="blog-snippet">
        {blog.content.length > 200
          ? blog.content.slice(0, 200) + "..."
          : blog.content}
      </p>
      <div className="blog-footer">
        <span>By: @{blog.author.username}</span>
        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default Blog;
