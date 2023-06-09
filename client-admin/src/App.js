import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Post from "./components/Post";
import NewPost from "./components/NewPost";

function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUser(localStorage.getItem("username"));
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="blog-api-client" element={<Home user={user} />}></Route>
        <Route
          path="/"
          element={<Navigate replace to="blog-api-client" />}
        ></Route>
        <Route
          path="/blog-api-client/posts/:postId"
          element={<Post user={user} />}
        ></Route>
        <Route
          path="/blog-api-client/login"
          element={<Login setUser={setUser} user={user} />}
        ></Route>
        <Route
          path="/blog-api-client/new-post"
          element={<NewPost user={user} />}
        ></Route>
        <Route
          path="/blog-api-client/sign-up"
          element={<SignUp setUser={setUser} user={user} />}
        ></Route>
        <Route
          path="*"
          element={
            <div className="route-error">Error 404: Route not found</div>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
