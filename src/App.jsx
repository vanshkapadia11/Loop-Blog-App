import React from "react";
import Signup from "./pages/Signup";
import { Route, Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import CreatePost from "./pages/CreatePost";
import MyPosts from "./pages/MyPosts";
import PostDetails from "./pages/PostDetails";

import EditPost from "./pages/EditPost";
const App = () => {
  function PrivateRoute({ children }) {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
  }
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/CreatePost" element={<CreatePost />} />
        <Route path="/MyPosts" element={<MyPosts />} />
        <Route path="dashboard/postDetails/:id" element={<PostDetails />} />
        <Route path="/edit/:id" element={<EditPost />} />
      </Routes>
    </>
  );
};

export default App;
