import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };
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
    // console.log(user);
  }, [isDark]);
  return (
    <>
      <section className="container2">
        <div className="flex justify-between items-center py-6 px-3">
          <div className="">
            <span className="material-symbols-rounded text-2xl font-semibold">
              360
            </span>
          </div>
          <div className="">
            <nav className="">
              <ul className="flex items-center text-sm font-semibold space-x-6 justify-center ring-1 ring-inset dark:bg-[#242424] dark:ring-[#2a2a2a] ring-[#e8e8e8] bg-[#f9f9f9] transition-all py-2 px-4 rounded-xl">
                {user ? (
                  <>
                    <li
                      className="uppercase cursor-pointer"
                      onClick={() => navigate("/")}
                    >
                      dashboard
                    </li>
                    <li
                      className="uppercase cursor-pointer text-red-600"
                      onClick={handleLogout}
                    >
                      <span className="material-symbols-rounded uppercase cursor-pointer text-red-600 text-lg font-semibold">
                        logout
                      </span>
                    </li>
                  </>
                ) : (
                  <>
                    <li
                      className="uppercase cursor-pointer"
                      onClick={() => navigate("/signup")}
                    >
                      signup
                    </li>
                    <li
                      className="uppercase cursor-pointer"
                      onClick={() => navigate("/login")}
                    >
                      login
                    </li>
                  </>
                )}
                <li className="link">
                  <span
                    className="material-symbols-rounded text-lg font-semibold"
                    onClick={() => setIsDark(!isDark)}
                  >
                    {isDark ? "backlight_high" : "bedtime"}
                  </span>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
};

export default Navbar;
