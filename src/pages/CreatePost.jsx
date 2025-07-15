import React, { useState } from "react";
import Navbar from "./Navbar";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !desc || !details) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "posts"), {
        title,
        desc,
        details,
        author: {
          uid: user.uid,
          email: user.email,
        },
        createdAt: serverTimestamp(),
      });

      setTitle("");
      setDesc("");
      setDetails("");
      navigate("/");
    } catch (err) {
      console.error("Error creating post:", err);
      setError("Something went wrong.");
    }
  };

  return (
    <>
      <section className="container">
        <Navbar />
        <div className="container1 mt-10">
          <div>
            <h2 className="text-2xl font-semibold uppercase flex items-center">
              Create A Post{" "}
              <span className="material-symbols-rounded ml-3 text-2xl font-semibold">
                arrow_outward
              </span>
            </h2>
          </div>
          <div className="mt-20 justify-self-center container w-11/12">
            <form className="flex flex-col rounded-lg" onSubmit={handleSubmit}>
              {error && (
                <p className="text-red-400 text-sm mb-4 font-semibold uppercase">
                  {error}
                </p>
              )}

              <label
                htmlFor="title"
                className="text-xs font-semibold mb-2 uppercase"
              >
                Enter Your post title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 mb-4 border rounded outline-none text-sm font-semibold dark:bg-[#242424] dark:ring-[#2a2a2a] ring-1 ring-[#e8e8e8] ring-inset"
                required
              />

              <label
                htmlFor="desc"
                className="text-xs font-semibold mb-2 uppercase"
              >
                Enter Your post desc
              </label>
              <textarea
                id="desc"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full p-3 mb-6 border rounded outline-none text-sm font-semibold dark:bg-[#242424] dark:ring-[#2a2a2a] ring-1 ring-[#e8e8e8] ring-inset"
                required
              />

              <label
                htmlFor="details"
                className="text-xs font-semibold mb-2 uppercase"
              >
                Enter Your post summary of post
              </label>
              <textarea
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full p-3 mb-6 border rounded outline-none text-sm font-semibold dark:bg-[#242424] dark:ring-[#2a2a2a] ring-1 ring-[#e8e8e8] ring-inset"
                required
              />

              <button
                type="submit"
                className="w-1/2 justify-self-center py-3 rounded-lg ring-1 ring-inset backdrop-blur-sm shadow-xl font-semibold text-sm ring-[#efefef] uppercase hover:scale-105 duration-500 transition-all"
              >
                CREATE post
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CreatePost;
