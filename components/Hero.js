import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 500); // Adjust the width as needed for mobile
    };

    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize); // Check on resize

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup on unmount
    };
  }, []);

  const bgImage = isMobile
    ? '/assets/bg_mobile.png' // Update with the correct mobile image path
    : 'https://miro.medium.com/v2/resize:fit:1400/1*i4q0k78c0NY8b2EyP9a9Tw.jpeg';

  return (
    <section className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white relative">
      <img
        src={bgImage}
        alt="Premier League Football Background"
        className="absolute inset-0 object-cover w-full h-full opacity-50"
      />
      <motion.div
        className="max-w-7xl mx-auto p-16 text-center relative z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-extrabold text-shadow">
          Unlock Your Fantasy Football Potential
        </h1>
        <p className="mt-6 text-lg max-w-lg mx-auto">
          AI-driven insights and data-centric recommendations to dominate your Fantasy Premier League!
        </p>
      </motion.div>
    </section>
  );
}
