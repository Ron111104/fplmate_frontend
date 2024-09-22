import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useRouter } from 'next/router';
import { useIsMobile } from '../components/hooks/useIsMobile'; // Import the custom hook
import { FcGoogle } from 'react-icons/fc'; // Import Google icon from react-icons
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Import eye icons

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [showPassword, setShowPassword] = useState(false); // State for showing password
  const router = useRouter();
  const isMobile = useIsMobile(); // Use the custom hook to detect if it's mobile

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      sessionStorage.setItem('email', email);
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/');
    } catch (error) {
      setError('Invalid credentials, please try again');
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    setLoading(true); // Set loading state
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      const user = auth.currentUser;
      sessionStorage.setItem('email', user.email);
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/');
    } catch (error) {
      setError('Error signing in with Google');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${isMobile ? '/assets/bg_laptop.png' : '/assets/bg_laptop.png'})`, // Apply mobile-specific background
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <motion.div
        className="bg-white p-10 rounded-lg shadow-xl max-w-md w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">Log In to FPL MATE</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
            >
              {showPassword ? <AiFillEye className="text-gray-700 mt-6" /> : <AiFillEyeInvisible className="text-gray-700 mt-6" />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
          >
            Log In
          </button>
        </form>
        {error && <p className="mt-4 text-center text-red-600 font-semibold">{error}</p>}

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className={`mt-6 w-full py-2 flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-100 rounded-md transition ${loading ? 'bg-gray-400' : ''}`}
          >
            <FcGoogle className="mr-2 text-2xl" /> {/* Google Icon */}
            {loading ? 'Signing In with Google...' : 'Sign In with Google'}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/signup" className="font-medium text-green-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
