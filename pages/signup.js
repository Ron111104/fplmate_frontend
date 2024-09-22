// pages/signup.js
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useRouter } from 'next/router';
import { useIsMobile } from '../components/hooks/useIsMobile'; // Import the custom hook
import { FcGoogle } from 'react-icons/fc';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Import eye icons

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for showing password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for showing confirm password
  const router = useRouter();
  const isMobile = useIsMobile(); // Use the custom hook to detect if it's mobile

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;

      sessionStorage.setItem('email', email);
      localStorage.setItem('isLoggedIn', 'true');

      setEmail('');
      setPassword('');
      setConfirmPassword('');

      router.push('/');
    } catch (error) {
      console.error('Error creating user:', error);
      setError(error.message || 'Error creating account');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      sessionStorage.setItem('email', user.email);
      localStorage.setItem('isLoggedIn', 'true');

      router.push('/');
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setError(error.message || 'Error with Google Sign-In');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${isMobile ? '/assets/bg_laptop.png' : '/assets/bg_laptop.png'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Create an Account</h2>
        <form onSubmit={handleSignUp} className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your email"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
            >
              {showPassword ? <AiFillEye className="text-gray-700 mt-6" /> : <AiFillEyeInvisible className="text-gray-700 mt-6" />}
            </button>
          </div>
          <div className="mb-6 relative">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
            >
              {showConfirmPassword ? <AiFillEye className="text-gray-700 mt-6" /> : <AiFillEyeInvisible className="text-gray-700 mt-6" />}
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md transition ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-500 text-white'}`}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-6">
          <button
            onClick={handleGoogleSignUp}
            disabled={loading}
            className={`w-full py-2 flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-100 rounded-md transition ${loading ? 'bg-gray-400' : ''}`}
          >
            <FcGoogle className="mr-2 text-2xl" />
            {loading ? 'Signing In with Google...' : 'Sign In with Google'}
          </button>
        </div>
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-green-600 hover:underline">
            Log In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
