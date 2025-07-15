import React from "react";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import Home from "./Home";
import Footer from "./Footer";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get current user

  const [isDark, setIsDark] = useState(() => {
    return localStorage.theme === "dark";
  });
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);
  return (
    <>
      <Navbar />
      <section className="flex justify-between flex-col container">
        <div className="flex flex-col mt-10">
          <div className="">
            {user ? (
              <>
                <div className="">
                  <div className="">
                    <h2 className="font-semibold text-xl uppercase flex items-center space-x-3">
                      <span className="material-symbols-rounded text-green-600 mr-2">
                        stat_2
                      </span>
                      Welcome, {user.displayName}
                    </h2>
                  </div>
                </div>
              </>
            ) : (
              <h2 className="font-semibold text-xl uppercase">
                Bro Who Are You ???
              </h2>
            )}
          </div>
          <div className="mt-10 flex flex-col">
            <div className="flex space-x-3 md:w-5/12 w-full">
              <button
                className="w-7/12 md:w-1/2 justify-self-center py-3 rounded-lg ring-1 ring-inset backdrop-blur-sm shadow-xl font-semibold text-sm ring-[#efefef] uppercase hover:scale-105 duration-500 transition-all"
                onClick={() => navigate("/CreatePost")}
              >
                CREATE NEW POST
              </button>
              <button
                className="w-9/12 md:w-1/2 justify-self-center py-3 rounded-lg ring-1 ring-inset backdrop-blur-sm shadow-xl font-semibold text-sm ring-[#efefef] uppercase hover:scale-105 duration-500 transition-all"
                onClick={() => navigate("/MyPosts")}
              >
                Check All Your Posts
              </button>
            </div>
            <div className="mt-16">
              <div className="">
                <h2 className="text-3xl font-semibold heading1 uppercase flex items-center">
                  posts
                  <span className="material-symbols-rounded ml-3 text-2xl font-semibold">
                    arrow_outward
                  </span>
                </h2>
              </div>
              <div className="mt-10">
                <Home />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Dashboard;
