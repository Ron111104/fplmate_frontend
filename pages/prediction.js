import PlayerForm from "../components/PlayerForm";
import Header from "../components/Header";
import { motion } from "framer-motion";
import { useIsMobile } from "../components/hooks/useIsMobile"; // Import the custom hook
import withAuthentication from "@firebase/withAuthentication"; // Ensure the correct path

const Prediction=()=> {
  const isMobile = useIsMobile(); // Use the custom hook to detect if it's mobile

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `url(${isMobile ? '/assets/bg_laptop.png' : '/assets/bg_laptop.png'})`, // Apply mobile-specific background
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Header />
      <motion.div
        className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.h1
          className="text-4xl font-extrabold text-center text-white mb-8" // Bright white text
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Player Performance Predictor
        </motion.h1>
        <motion.p
          className="text-xl text-center text-gray-100 mb-12 max-w-2xl mx-auto" // Lighter gray text
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Enter player statistics to get AI-powered performance predictions
        </motion.p>
        <PlayerForm />
      </motion.div>
    </div>
  );
}

export default withAuthentication(Prediction);
