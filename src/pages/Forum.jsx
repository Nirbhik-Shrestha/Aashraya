import { useEffect, useState } from "react";
import "./Forum.css";
import Post from "../components/Post"; // add at top




function Forum() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});



  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("/api/forum", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setPosts(data.posts))
      .catch((err) => console.error("Error loading posts:", err));
  }, []);

  useEffect(() => {
  // Fetch user info once
  fetch("/api/auth/me", {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => setCurrentUserId(data.id));
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/forum", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newPost }),
      });

      const data = await res.json();
      if (res.ok) {
        setPosts([data.post, ...posts]);
        setNewPost("");
      } else {
        alert(data.message || "Failed to post");
      }
    } catch (err) {
      console.error("Submit error:", err);
    }
    setLoading(false);
  };

  const handleLike = async (postId) => {
  try {
    const res = await fetch(`/api/forum/${postId}/like`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setPosts(posts.map((p) => (p._id === postId ? data.post : p)));
  } catch (err) {
    console.error("Like error:", err);
  }
};

const handleDelete = async (postId) => {
  if (!window.confirm("Are you sure you want to delete this post?")) return;

  try {
    await fetch(`/api/forum/${postId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setPosts(posts.filter((p) => p._id !== postId));
  } catch (err) {
    console.error("Delete error:", err);
  }
};

const handleCommentChange = (postId, value) => {
  setCommentInputs((prev) => ({ ...prev, [postId]: value }));
};

const handleCommentSubmit = async (e, postId) => {
  e.preventDefault();
  const text = commentInputs[postId];
  if (!text.trim()) return;

  try {
    const res = await fetch(`/api/forum/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    setPosts(posts.map((p) => (p._id === postId ? data.post : p)));
    setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
  } catch (err) {
    console.error("Failed to add comment:", err);
  }
};



  return (
    <div className="forum-container">
      <h2 className="forum-title">Community Forum</h2>

      <form className="post-form" onSubmit={handleSubmit}>
        <textarea
          placeholder="Share something with the community..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          rows={3}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post"}
        </button>
      </form>

      <div className="posts-list">
        {posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            currentUserId={currentUserId}
            onLike={handleLike}
            onDelete={handleDelete}
            onCommentSubmit={handleCommentSubmit}
            onCommentChange={handleCommentChange}
            commentValue={commentInputs[post._id]}
          />
        ))}
        {posts.length === 0 && <p>No posts yet.</p>}
      </div>
    </div>
  );
}

export default Forum;
