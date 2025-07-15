import React, { useState } from "react";
import Navbar from "./Navbar";
import { useParams, useSearchParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // or wherever your db is exported
import { useEffect } from "react";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  useEffect(() => {
    const getPost = async () => {
      try {
        const docRef = doc(db, "posts", id); // replace with dynamic ID later
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setPost(docSnap.data()); // or however you're storing it
        } else {
          console.log("No such document!");
        }
      } catch (err) {
        console.error("Error fetching document:", err);
      }
    };

    getPost();
  }, [id]);
  return (
    <>
      <section className="container">
        <div className="">
          <Navbar />
        </div>
        <div className="mt-10 container1">
          <div className="">
            <h2 className="text-3xl font-semibold uppercase flex items-center">
              post details{" "}
              <span className="material-symbols-rounded ml-3 text-2xl font-semibold text-green-600">
                arrow_outward
              </span>
            </h2>
          </div>
          <div className="mt-10 py-20 container2 uppercase">
            {post && (
              <div className="">
                <h2 className="text-2xl font-semibold">{post.title}</h2>
                <p className="font-medium text-md mt-3">{post.desc}</p>
                <p className="font-medium text-xs mt-3">
                  uploaded by:{" "}
                  <span className="text-gray-700">{post.author.email}</span>
                </p>
                <p className="font-medium text-md mt-10">{post.details}</p>
              </div>
            )}
          </div>
          <hr />
          <div className="mt-20 flex justify-center items-center flex-col">
            <h2 className="font-semibold text-lg uppercase mb-5">OR</h2>
            <h2 className="font-semibold text-lg uppercase mb-5">
              you can create you own post
            </h2>

            <button
              type="submit"
              className="w-9/12 justify-self-center py-3 rounded-lg ring-1 ring-inset backdrop-blur-sm shadow-xl font-semibold text-sm ring-[#efefef] uppercase hover:scale-105 duration-500 transition-all"
              onClick={() => navigate("/CreatePost")}
            >
              Create you own post today!!
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default PostDetails;
