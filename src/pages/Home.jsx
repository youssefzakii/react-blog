import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("http://localhost:5000/posts");
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/posts/${id}`, {
      method: "DELETE",
    });

    const response = await fetch("http://localhost:5000/posts");
    const data = await response.json();
    setPosts(data);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-6">
      <h2 className="text-4xl text-center font-semibold mb-6">All Posts</h2>

      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-lg rounded-xl p-6 space-y-4 relative"
          >
            <h3 className="text-2xl font-bold">{post.title}</h3>
            <p className="text-gray-700 text-lg">{post.body}</p>
            {post.imageURL && (
              <img
                src={post.imageURL}
                alt={post.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            )}

            {currentUser?.email === post.userId && (
              <div className="absolute top-4 right-4 space-x-2">
                <Link
                  to={`/post-detail/${post.id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-1 rounded-full transition"
                >
                  View Post
                </Link>

                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1 rounded-full transition"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 text-lg">No posts available</p>
      )}
    </div>
  );
};

export default Home;
