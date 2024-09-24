import React, { useEffect, useState } from 'react';
import { auth } from '@firebase/firebaseConfig'; // Adjust the import path if necessary
import { useAuthState } from 'react-firebase-hooks/auth';
import withAuthentication from '@firebase/withAuthentication';
import { motion } from 'framer-motion';

const Profile = () => {
  const [user, loading, error] = useAuthState(auth); // Get the current authenticated user
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.displayName || '');
      setBio(''); // Fetch this from Firestore if you have user bios stored
    }
  }, [user]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Logic to save username and bio, e.g., update Firestore
    setIsEditing(false);
  };

  if (loading) {
    return <p>Loading...</p>; // Consistent loading state
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url('/assets/bg_laptop.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <motion.div
        className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">User Profile</h2>
        {user ? (
          <div className="text-center">
            <img
              src={user.photoURL || 'https://via.placeholder.com/150'}
              alt={user.displayName || 'User Avatar'}
              className="w-32 h-32 rounded-full mx-auto mb-4 shadow-md border-2 border-gray-300"
            />
            <h3 className="text-xl font-semibold">{user.displayName || 'No Name'}</h3>
            <p className="text-gray-600">{user.email}</p>

            {isEditing ? (
              <div className="mt-4">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border border-gray-300 rounded p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Username"
                />
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="border border-gray-300 rounded p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Bio"
                  rows="4"
                />
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="mt-4">
                <button
                  onClick={handleEdit}
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                >
                  Edit Profile
                </button>
              </div>
            )}

            <button
              onClick={() => auth.signOut()}
              className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <p className="text-center">No user is signed in.</p>
        )}
      </motion.div>
    </div>
  );
};

export default withAuthentication(Profile);
