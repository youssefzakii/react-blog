import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./pages/Home";
import PostWriting from "./pages/PostWriting";
import PostDetail from "./pages/PostDetail"; // تأكد من استيراد الصفحة بشكل صحيح
import Navbar from "./components/Navbar";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-lg">
          <Routes>
            <Route
              path="/signup"
              element={<Signup setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/login"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/post-writing" element={<PostWriting />} />
            <Route path="/post-detail/:id" element={<PostDetail />} />{" "}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
