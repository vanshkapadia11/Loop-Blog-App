import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "../context/AuthContext";
import { useRef } from "react";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const postData = docSnap.data();
          if (postData.author.uid !== user.uid) {
            alert("You are not allowed to edit this post.");
            navigate("/");
            return;
          }
          setPost(postData);
          setTitle(postData.title);
          setDesc(postData.desc);
          setDetails(postData.details);
        } else {
          alert("Post not found.");
          navigate("/");
        }
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };

    fetchPost();
  }, [id, user, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!title || !desc || !details) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      const docRef = doc(db, "posts", id);
      await updateDoc(docRef, {
        title,
        desc,
        details,
        updatedAt: serverTimestamp(),
      });

      alert("Post updated successfully!");
      navigate(`/postDetails/${id}`);
    } catch (err) {
      console.error("Error updating post:", err);
      setError("Failed to update post.");
    }
    navigate("/MyPosts");
  };

  return (
    <>
      <Navbar />
      <section className="container mt-10 flex justify-between h-screen flex-col">
        <h2 className="text-2xl font-semibold uppercase mb-10 flex items-center">
          Edit Post
          <span className="material-symbols-rounded ml-2 text-2xl text-green-600">
            edit_note
          </span>
        </h2>

        {post && (
          <form className="flex flex-col" onSubmit={handleUpdate}>
            {error && (
              <p className="text-red-400 text-sm mb-4 font-semibold uppercase">
                {error}
              </p>
            )}

            <label
              htmlFor="title"
              className="text-xs font-semibold mb-2 uppercase"
            >
              Edit post title
            </label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 mb-4 border rounded outline-none text-sm font-semibold dark:bg-[#242424] ring-1 ring-[#e8e8e8] ring-inset"
              required
            />

            <label
              htmlFor="desc"
              className="text-xs font-semibold mb-2 uppercase"
            >
              Edit post description
            </label>
            <textarea
              id="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full p-3 mb-6 border rounded outline-none text-sm font-semibold dark:bg-[#242424] ring-1 ring-[#e8e8e8] ring-inset"
              required
            />

            <label
              htmlFor="details"
              className="text-xs font-semibold mb-2 uppercase"
            >
              Edit post details
            </label>
            <textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full p-3 mb-6 border rounded outline-none text-sm font-semibold dark:bg-[#242424] ring-1 ring-[#e8e8e8] ring-inset"
              required
            />

            <button
              type="submit"
              className="w-1/2 md:w-2/12  py-3 rounded-lg ring-1 ring-inset backdrop-blur-sm shadow-xl font-semibold text-sm ring-[#efefef] uppercase hover:scale-105 duration-500 transition-all"
            >
              Update Post
            </button>
          </form>
        )}
        <Footer />
      </section>
    </>
  );
};

export default EditPost;
