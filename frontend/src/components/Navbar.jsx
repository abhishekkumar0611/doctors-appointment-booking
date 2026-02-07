<<<<<<< HEAD
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
=======
import React, { useState } from 'react'
import {assets} from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const navigate = useNavigate();

    const { token, setToken, userData } = useContext(AppContext)

    const [showMenu, setShowMenu] = useState(false);
 
    const logout = () => {
        setToken('false')
        localStorage.removeItem('token')
    }
   
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
        <img onClick={() => navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt=""/>
        <ul className='hidden md:flex items-start gap-5 font-medium'>
            <NavLink to='/'>
                <li className='py-1'>HOME</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/doctors'>
                <li className='py-1'>ALL DOCTORS</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/about'>
                <li className='py-1'>ABOUT</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/contact'>
                <li className='py-1'>CONTACT</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
        </ul>
        <div className='flex item-center gap-4'> 
            {
                token && userData
                ? <div className='flex items-center gap-2 cursor-pointer group relative'>
                    <img className='w-8 rounded-full' src={userData.image} alt=""/>
                    <img className='w-2.5' src={assets.dropdown_icon} alt="" />
                    <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                        <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'> 
                            <p onClick={()=>navigate('my-profile')}className='hover:text-black cursor-pointer'>My Profile</p>
                            <p onClick={()=>navigate('my-appointments')}className='hover:text-black cursor-pointer'>My Appointments</p>
                            <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                        </div>
                    </div>
                </div>
                :<button onClick={()=>navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create account</button>
                
            }
            <img onClick={() =>setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
            <div className={` ${showMenu ? ' fixed w-full': 'w-0 h-0'} md-hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                <div>
                    <img className='w-36'  src={assets.logo} />
                    <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} />
                </div>
                <ul className='flex flex-col items-center justify-between gap-2 mt-5 px-5  text-lg font-medium'>
                    <NavLink className='px-4 py-2 rounded full inline-block ' onClick={() => setShowMenu(false)} to='/'><p >HOME</p></NavLink>
                    <NavLink className='px-4 py-2 rounded full inline-block ' onClick={() => setShowMenu(false)} to="doctors"><p >ALL DOCTORS</p></NavLink>
                    <NavLink className='px-4 py-2 rounded full inline-block ' onClick={() => setShowMenu(false)} to="about"><p>ABOUT</p></NavLink>
                    <NavLink className='px-4 py-2 rounded full inline-block ' onClick={() => setShowMenu(false)} to="/contact"><p>CONTACT</p></NavLink>
                </ul>
            </div>
        </div>
      
    </div>
  )
}

export default Navbar;

>>>>>>> 6a576abdee5462a810efa8e598b45ba5b3df7102
