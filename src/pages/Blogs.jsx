import { useEffect, useState } from "react";
import Blog from "../components/Blog";
// import "./Blogs.css";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("/api/blogs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.blogs);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load blogs:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="blogs-page">
      <h2>Latest Blogs</h2>
      {loading ? (
        <p>Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p>No blogs yet.</p>
      ) : (
        <div className="blogs-list">
          {blogs.map((blog) => (
            <Blog key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Blogs;
