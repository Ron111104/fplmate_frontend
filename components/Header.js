import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    const email = sessionStorage.getItem("email");
    setIsLoggedIn(loggedInStatus === "true" && email !== null && email !== "");
  }, []);
  
  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("email"); // Clear email from sessionStorage
    setIsLoggedIn(false);
    router.push("/login");
  };

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <header className="bg-white shadow-lg">
      <motion.div
        className="max-w-full mx-auto p-4 flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center">
          <Image
            src="/assets/logo.png"
            alt="FPLMate Logo"
            className="h-[50px] w-auto"
            height={100}
            width={150}
          />
        </div>

        <nav className="space-x-8 hidden md:flex items-center">
          <Link href="/" className="text-black">Home</Link>
          <Link href="/dashboard" className="text-black">Dashboard</Link>
          <Link href="#features" className="text-black">Features</Link>
          <Link href="/analysis" className="text-black">Analysis</Link>

          {isLoggedIn ? (
            <div className="relative">
              <button onClick={toggleProfileDropdown} className="flex items-center space-x-2">
                <img
                  src="https://www.shutterstock.com/image-photo/close-head-shot-portrait-preppy-260nw-1433809418.jpg"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <FontAwesomeIcon icon={faChevronDown} className="text-black" />
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-md rounded-lg  z-30">
                  <Link href="/profile" className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100">Profile</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link href="/signup" className="text-black">Sign In</Link>
              <Link href="/login" className="text-black">Log In</Link>
            </div>
          )}
        </nav>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          <FontAwesomeIcon icon={faBars} className="text-black" size="lg" />
        </button>
      </motion.div>

      {menuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-white flex flex-col justify-between z-20" style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
          <button onClick={() => setMenuOpen(false)} className="absolute top-4 right-4 bg-black rounded-full px-2 py-1">
            <FontAwesomeIcon icon={faTimes} className="text-white" size="lg" />
          </button>
          <div className="flex justify-start items-center pl-6 py-4">
            <Image
              src="/assets/logo.png"
              alt="FPLMate Logo"
              className="h-[50px] w-auto"
              width={150}
              height={50}
            />
          </div>

          <div className="text-center flex flex-col items-center space-y-6">
            <Link href="/" className="w-full text-2xl text-black font-semibold hover:bg-gray-100 py-4">Home</Link>
            <Link href="/dashboard" className="w-full text-2xl text-black font-semibold hover:bg-gray-100 py-4">Dashboard</Link>
            <Link href="#features" className="w-full text-2xl text-black font-semibold hover:bg-gray-100 py-4">Features</Link>
            <Link href="/analysis" className="w-full text-2xl text-black font-semibold hover:bg-gray-100 py-4">Analysis</Link>
          </div>

          {isLoggedIn ? (
            <div className="flex justify-center space-x-4 pb-8">
              <button onClick={handleLogout} className="px-8 py-3 bg-black text-white rounded-xl text-xl hover:shadow-lg">Logout</button>
            </div>
          ) : (
            <div className="flex justify-center space-x-4 pb-8">
              <Link href="/signup" className="px-8 py-3 bg-gray-200 text-black rounded-xl text-xl hover:shadow-lg">Sign In</Link>
              <Link href="/login" className="px-8 py-3 bg-black text-white rounded-xl text-xl hover:shadow-lg">Log In</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
