import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const MyPosts = () => {
  const { user } = useAuth();
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMyPosts = async () => {
    if (!user) return;

    try {
      const q = query(
        collection(db, "posts"),
        where("author.uid", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      const posts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMyPosts(posts);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching user posts:", err);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, [user]);

  const handleDelete = async (postId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, "posts", postId));
      setMyPosts((prev) => prev.filter((post) => post.id !== postId));
      alert("Post deleted successfully.");
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete post.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-between h-screen flex-col">
        <section className="container mt-10 ">
          <h2 className="text-2xl font-semibold uppercase flex items-center">
            Your Posts{" "}
            <span className="material-symbols-rounded ml-2 text-2xl text-green-600">
              bookmark_added
            </span>
          </h2>

          {loading ? (
            <p className="mt-10">Loading...</p>
          ) : myPosts.length === 0 ? (
            <>
              <p className="mt-10 font-semibold uppercase">
                No posts found. Create your first one now!
              </p>
              <button
                type="submit"
                className="mt-5 md:w-2/12 w-1/2 justify-self-center py-3 rounded-lg ring-1 ring-inset backdrop-blur-sm shadow-xl font-semibold text-sm ring-[#efefef] uppercase hover:scale-105 duration-500 transition-all"
                onClick={() => navigate("/CreatePost")}
              >
                CREATE post Now
              </button>
            </>
          ) : (
            <div className="mt-10 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 uppercase">
              {myPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-5 rounded-xl border dark:border-[#2a2a2a] ring-1 ring-[#f0f0f0] dark:ring-[#1c1c1c] shadow-lg transition-all"
                >
                  <h3 className="text-xl font-bold">{post.title}</h3>
                  <p className="text-sm mt-2">{post.desc}</p>
                  <p className="text-xs mt-1 text-gray-600">
                    Created by: {post.author.email}
                  </p>
                  <div className="flex w-full space-x-4 mt-4">
                    <button
                      className="mt-4 w-1/2 justify-self-center py-3 rounded-lg ring-1 ring-inset backdrop-blur-sm shadow-xl font-semibold text-sm ring-[#efefef] uppercase hover:scale-105 duration-500 transition-all"
                      onClick={() => navigate(`/edit/${post.id}`)}
                    >
                      Edit Post
                    </button>
                    <button
                      className="mt-4 w-1/2 justify-self-center py-3 rounded-lg ring-1 ring-inset backdrop-blur-sm shadow-xl font-semibold text-sm ring-[#efefef] uppercase hover:scale-105 duration-500 transition-all dark:text-red-400 text-red-600"
                      onClick={() => handleDelete(post.id)}
                    >
                      DELETE Post
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
        <Footer />
      </div>
    </>
  );
};

export default MyPosts;
