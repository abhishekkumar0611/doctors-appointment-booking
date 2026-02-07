import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, userData, logout, loading } = useContext(AppContext);

  const [openMenu, setOpenMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setOpenMenu(false);
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between py-4 border-b relative">
      {/* Logo */}
      <img
        src={assets.logo}
        className="w-44 cursor-pointer"
        onClick={() => navigate("/")}
        alt="logo"
      />

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 font-medium">
        <NavLink to="/" className="hover:text-primary">HOME</NavLink>
        <NavLink to="/doctors" className="hover:text-primary">ALL DOCTORS</NavLink>
        <NavLink to="/about" className="hover:text-primary">ABOUT</NavLink>
        <NavLink to="/contact" className="hover:text-primary">CONTACT</NavLink>
      </ul>

      {/* Right Section */}
      {!loading && (
        token ? (
          <div className="relative">
            {/* Avatar */}
            <img
              src={userData?.image || assets.profile_placeholder}
              className="w-9 h-9 rounded-full cursor-pointer border"
              alt="profile"
              onClick={() => setOpenMenu(!openMenu)}
            />

            {/* Dropdown */}
            {openMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border z-50">
                <p
                  onClick={() => {
                    navigate("/my-profile");
                    setOpenMenu(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  My Profile
                </p>

                <p
                  onClick={() => {
                    navigate("/my-appointments");
                    setOpenMenu(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  My Appointments
                </p>

                <p
                  onClick={handleLogout}
                  className="px-4 py-2  hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-6 py-2 rounded-full"
          >
            Create Account
          </button>
        )
      )}
    </div>
  );
};

export default Navbar;
