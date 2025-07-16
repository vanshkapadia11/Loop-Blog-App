import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts
  const fetchPosts = async () => {
    try {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts(postsData);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="uppercase">
      {loading ? (
        <p className="mt-10 text-gray-500 font-semibold text-sm">
          Loading posts...
        </p>
      ) : posts.length === 0 ? (
        <p className="mt-10 text-gray-500 font-semibold text-sm">
          No posts yet.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {posts.map((post) => (
            <div
              key={post.id}
              className="cursor-pointer rounded-lg border dark:border-[#2a2a2a] p-7 backdrop-blur-sm ring-1 ring-inset ring-[#efefef] shadow-lg"
              onClick={() => navigate(`postDetails/${post.id}`)}
            >
              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                {post.desc}
              </p>
              <p className="text-xs font-semibold text-gray-400">
                By: <span className="font-medium">{post.author.email}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Home;
