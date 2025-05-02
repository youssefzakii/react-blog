import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostWriting = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageURL(reader.result); // Base64 string
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = localStorage.getItem("user");
    if (!user) {
      alert("You need to be logged in to create a post.");
      navigate("/login");
      return;
    }

    const newPost = {
      title,
      body,
      imageURL,
      userId: JSON.parse(user).email,
    };

    await fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });

    setTitle("");
    setBody("");
    setImageURL("");
    setImageFile(null);
    navigate("/home");
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Write a New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border"
          />
        </div>
        <div>
          <label htmlFor="body" className="block">
            Body
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-2 border"
          />
        </div>
        <div>
          <label htmlFor="imageURL" className="block">
            Image URL (اختياري)
          </label>
          <input
            type="text"
            id="imageURL"
            value={imageURL.startsWith("data:") ? "" : imageURL}
            onChange={(e) => setImageURL(e.target.value)}
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

        {imageURL && (
          <img
            src={imageURL}
            alt="Preview"
            className="w-full h-64 object-cover rounded-lg mt-4"
          />
        )}

        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Post
        </button>
      </form>
    </div>
  );
};

export default PostWriting;
