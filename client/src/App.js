import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

function App() {
  const [user, setUser] = useState("");

  return (
    <BrowserRouter>
      <Navbar user={user} />
      <Routes>
        <Route path="blog-api" element={<Home />}></Route>
        <Route path="/" element={<Navigate replace to="blog-api" />}></Route>
        <Route path="login" element={<div>Login Path</div>}></Route>
        <Route path="*" element={<div>Error 404, route not found</div>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
