import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    body: "",
    imageURL: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`http://localhost:5000/posts/${id}`);
      const data = await response.json();
      setPost(data);
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPost((prev) => ({ ...prev, imageURL: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    await fetch(`http://localhost:5000/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    navigate("/home");
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold">
        {isEditing ? "Edit Post" : post.title}
      </h2>

      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={post.title}
              onChange={handleChange}
              className="w-full p-2 border"
            />
          </div>
          <div>
            <label htmlFor="body" className="block">
              Body
            </label>
            <textarea
              id="body"
              name="body"
              value={post.body}
              onChange={handleChange}
              className="w-full p-2 border"
            />
          </div>
          <div>
            <label htmlFor="imageURL" className="block">
              Image URL
            </label>
            <input
              type="text"
              id="imageURL"
              name="imageURL"
              value={post.imageURL.startsWith("data:") ? "" : post.imageURL}
              onChange={handleChange}
              className="w-full p-2 border"
            />
          </div>
          <div>
            <label htmlFor="imageFile" className="block">
              Or Upload Image
            </label>
            <input
              type="file"
              id="imageFile"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border"
            />
          </div>
          {post.imageURL && (
            <img
              src={post.imageURL}
              alt="Preview"
              className="w-full h-64 object-cover rounded-lg"
            />
          )}
          <button
            onClick={handleSave}
            className="bg-green-500 text-white p-2 w-full"
          >
            Save Changes
          </button>
        </div>
      ) : (
        <>
          <p>{post.body}</p>
          {post.imageURL && (
            <img
              src={post.imageURL}
              alt={post.title}
              className="w-full h-auto"
            />
          )}
          <div className="space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-1 rounded-full transition"
            >
              Edit Post
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PostDetail;
